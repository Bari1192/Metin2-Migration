import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API = "https://backend-admin-login.fly.dev/api";
const TARGET_PATH = path.join(
    __dirname,
    "storage/app/private/ItemStore_Hungary.json"
);
async function getToken() {
    const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: process.env.ADMIN_USER,
            password: process.env.ADMIN_PASS,
        }),
    });

    const text = await res.text();
    console.log("📄 Login response body:\n", text);

    try {
        const data = JSON.parse(text);
        if (!data.success || !data.token) {
            throw new Error(
                "❌ Bejelentkezés sikertelen: " +
                    (data.message || "Ismeretlen hiba")
            );
        }
        return data.token;
    } catch (err) {
        throw new Error(
            "❌ A login válasz nem JSON formátumú vagy hibás: " + err.message
        );
    }
}

async function getBackupList(token) {
    const res = await fetch(`${API}/download-backups`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Backup list hiba: ${res.status}`);
    return res.json();
}

async function downloadAndSaveBackup(token, url, target) {
    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Download hiba: ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());

    const targetDir = path.dirname(target);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(target, buf);
    console.log("✅ Backup letöltve:", target);
}

(async () => {
    try {
        const token = await getToken();
        const backupInfo = await getBackupList(token);
        console.log("🧪 Backup info:", backupInfo);

        if (!backupInfo.filename)
            throw new Error("⚠️⚡ Nincs backup fájl a szerveren! ⚡⚠️");

        const downloadUrl = `${API}/download-backup/${backupInfo.filename}`;
        await downloadAndSaveBackup(token, downloadUrl, TARGET_PATH);
    } catch (error) {
        console.error("❌👉 Hiba (/download-backup/ résznél):", error.message);
    }
})();

//  >>>    ÍGY CSEKKOLD SSH-VAL A SZERVER MAPPÁIT   <<<

//  fly ssh console -a backend-admin-login
//  ls -la /var/www/storage/app/private/
