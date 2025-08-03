import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const hungaryStore = defineStore("items", () => {
  const hungaryItems = ref([
    { name: "Lord pánt - 20%-os", price: 10, icon:"https://img.m2icondb.com/85004.png"},
    { name: "1000 SÉ utalvány", price: 38, price_yang:50_000_000, group:"tárgypiac", icon:"https://img.m2icondb.com/80016.png" },
    { name: "Bátorság Köpeny", price_yang:25_000_000, quantity: 200, icon:"https://img.m2icondb.com/70038.png"},
    { name: "Kvarchomok", price_yang: 3_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30195.png"},
    { name: "Holdfény Kincsesláda", price: 2,price_yang:40_000_000, quantity: 200, group:"láda" , icon:"https://img.m2icondb.com/50011.png"},
    { name: "Titán-Dioxid", price_yang: 40_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30616.png"},
    { name: "Szürke festék", price_yang: 800_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30604.png"},
    { name: "Mágikus magvak", price_yang: 5_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30197.png"},
    { name: "Víztiszta kristály", price_yang: 2_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30198.png"},
    { name: "Démoni Hamvak", price_yang: 10_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30196.png"},
    { name: "Kék Kristály", price_yang: 5_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30199.png"},
    { name: "Tűzcipő +5", price: 1 , group:"ékszer" , icon:"https://img.m2icondb.com/15440.png"},
    { name: "Vas ékszertároló", price: 1,price_yang:50_000_000, quantity: 200, group:"láda" , icon:"https://img.m2icondb.com/boss_box.png"},
    { name: "Vas doboz", price: 3, quantity: 200, group:"láda" , icon:"https://img.m2icondb.com/boss_box.png"},
    { name: "Vas láda", price: 3, quantity: 200, group:"láda" , icon:"https://img.m2icondb.com/boss_box.png"},
    { name: "Ismeretlen gyógyszer+", price_yang: 89_000_000, quantity: 200, group:"fejlesztés" , icon:"https://img.m2icondb.com/30009.png"},
    { name: "Békanyelv", price_yang: 400_000 , group:"fejlesztés" , icon:"https://img.m2icondb.com/30060.png"},
    { name: "Ezotéria bevezető", price_yang: 400_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30008.png"},
    { name: "Démoni Ékkő", price_yang: 500_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30016.png"},
    { name: "Démoni Emléktárgy", price_yang: 500_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30015.png"},
    { name: "Démoni Emléktárgy+", price_yang: 2_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30015.png"},
    { name: "Szövetdarab+", price_yang: 4_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30039.png"},
    { name: "Jéggömb", price_yang: 800_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30050.png"},
    { name: "Pókláb", price_yang: 400_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30059.png"},
    { name: "Orgona", price_yang: 6_500_000, quantity: 200, group:"virág" , icon:"https://img.m2icondb.com/50705.png"},
    { name: "Barackvirág", price_yang: 4_000_000, quantity: 200, group:"virág" , icon:"https://img.m2icondb.com/50701.png"},
    { name: "Harangvirág", price_yang: 9_000_000, quantity: 200, group:"virág" , icon:"https://img.m2icondb.com/50702.png"},
    { name: "Alpesi Rózsa", price_yang: 3_000_000, quantity: 200, group:"virág" , icon:"https://img.m2icondb.com/50707.png"},
    { name: "Zöld ital (Nagy)", price_yang: 25_000_000, quantity: 200, group:"italok" , icon:"https://img.m2icondb.com/27102.png"},
    { name: "Lila ital (Nagy)", price_yang: 2_200_000, quantity: 200, group:"italok" , icon:"https://img.m2icondb.com/27105.png"},
    { name: "Skorpió farok", price_yang: 200_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30046.png"},
    { name: "Kígyófarok+", price_yang: 700_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30022.png"},
    { name: "Vas sisak +9", price_yang: 90_000_000, group:"ékszer" , icon:"https://img.m2icondb.com/12220.png"},
    { name: "Fehér Gyöngy", price_yang: 3_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/27992.png"},
    { name: "Kék Gyöngy", price_yang: 2_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/27993.png"},
    { name: "Vörös Gyöngy", price_yang: 400_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/27994.png"},
    { name: "Kovács Kézikönyv", price: 3, group:"tárgypiac" , icon:"https://img.m2icondb.com/70039.png"},
    { name: "Masszív Zsinórok", price_yang: 15_000_000, quantity: 200, group:"fejlesztés" , icon:"https://img.m2icondb.com/30612.png"},
    { name: "Áldástekercs", price_yang: 1_200_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/25040.png"},
    { name: "Sötét Talizmán", price: 1, price_yang:10_000_000, group:"talizmánok" , icon:"https://img.m2icondb.com/10290.png"},
    { name: "Szél Talizmán", price: 3, group:"talizmánok" , icon:"https://img.m2icondb.com/10520.png"},
    { name: "Jég Talizmán", price: 10, group:"talizmánok" , icon:"https://img.m2icondb.com/9830.png"},
    { name: "Tűz Talizmán", price: 3, group:"talizmánok", icon:"https://img.m2icondb.com/9600.png"},
    { name: "Föld talizmán", price_yang: 88_000_000, group:"talizmánok", icon:"https://img.m2icondb.com/10060.png"},
    { name: "Villám Talizmán", price: 6, group:"talizmánok", icon:"https://img.m2icondb.com/10750.png"},
    { name: "Mennyei könny", price_yang: 5_000_000, group:"kohó" , icon:"https://img.m2icondb.com/50633.png"},
    { name: "Réz", price_yang: 4_000_000, group:"kohó" , icon:"https://img.m2icondb.com/50624.png"},
    { name: "Ezüst", price_yang: 400_000, group:"kohó" , icon:"https://img.m2icondb.com/50625.png"},
    { name: "Réz Nyaklánc +9 (alap)", price: 3, group:"ékszer" , icon:"https://img.m2icondb.com/16020.png"},
    { name: "Facipő +9 (alap)", price: 1, group:"ékszer" , icon:"https://img.m2icondb.com/15040.png"},
    { name: "Ébenfa Fülbevaló +9 (alap)", price_yang: 80_000_000, group:"ékszer" , icon:"https://img.m2icondb.com/17100.png"},
    { name: "Lánc Csuklya (+5 - 15% villám)", price: 1 , group:"ékszer" , icon:"https://img.m2icondb.com/12360.png"},
    { name: "Nixie Láda", price_yang: 3_000_000 , group:"láda" , icon:"https://img.m2icondb.com/83032.png"},
    { name: "Nixie Kulcs", price_yang: 5_000_000, group:"láda" , icon:"https://img.m2icondb.com/50043.png"},
    { name: "A kard aurája készségkönyv", price_yang: 7_000_000, group:"egyéb" , icon:"https://img.m2icondb.com/book_01.png"},
    { name: "Varjúacél Íj (+7) - (41 ák)", price: 5, price_yang: 75_000_000, group:"fegyver" , icon:"https://img.m2icondb.com/02170.png"},
    { name: "Békacomb", price_yang: 400_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30061.png"},
    { name: "jégdarab+", price_yang: 500_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30048.png"},
    { name: "farkasszőr+", price_yang: 15_000_000, quantity: 200, group:"fejlesztés" , icon:""},
    { name: "ékkődarab", price_yang: 500_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/30027.png"},
    { name: "Leltárbővítő", price_yang: 33_000_000, group:"tárgypiac" , icon:"https://img.m2icondb.com/72319.png"},
    { name: "Sárkány karom", price_yang: 15_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/71129.png"},
    { name: "Sárkány pikkely", price_yang: 10_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/71123.png"},
    { name: "Nessie Tojás", price_yang: 20_000_000, group:"egyéb" , icon:"https://img.m2icondb.com/55410.png"},
    { name: "Razador Tojás", price_yang: 20_000_000, group:"egyéb" , icon:"https://img.m2icondb.com/55403.png"},
    { name: "Vad harcos könyv", price_yang: 5_000_000 , group:"egyéb" , icon:"https://img.m2icondb.com/50324.png"},
    { name: "Középszerű káosz-kő", price_yang: 40_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/31137.png"},
    { name: "Közönséges káosz-kő", price_yang: 50_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/31136.png"},
    { name: "Tűzvörös kő", price_yang: 40_000_000, group:"fejlesztés" , icon:"https://img.m2icondb.com/18900.png"},
    { name: "Halálos lemezvért +9 (alap)", price: 3, group:"vért" , icon:"https://img.m2icondb.com/11240.png"},
    { name: "Acél csuklya +9 (alap)", price: 2, price_yang: 50_000_000, group:"ékszer" , icon:"https://img.m2icondb.com/12380.png"},
    { name: "Fekete Mágia vért +9 (alap)", price: 2 , group:"vért" , icon:"https://img.m2icondb.com/11690.png"},
    { name: "Feketevas vért +9 (alap)", price: 2, group:"vért" , icon:"https://img.m2icondb.com/11290.png"},
    { name: "Mennyei Könny Fülbevaló +9 (alap)", price: 1 ,price_yang: 30_000_000 , group:"ékszer" , icon:"https://img.m2icondb.com/17200.png"},
    { name: "Mennyei Könny nyaklánc +9 (alap)", price: 5, group:"ékszer" , icon:"https://img.m2icondb.com/16200.png"},
    { name: "Mennyei Könny karkötő +9 (alap)", price: 6, group:"ékszer" , icon:"https://img.m2icondb.com/14200.png"},
    { name: "Ezüst nyaklánc +9 (alap)", price: 1, price_yang: 33_000_000, group:"ékszer" , icon:"https://img.m2icondb.com/16040.png"},
    { name: "kagyló", price_yang: 15_000_000, quantity: 200, group:"fejlesztés" , icon:"https://img.m2icondb.com/27987.png"},
    { name: "Bambuszbőr cipő +9 (alap)", price: 1, group:"ékszer" , icon:"https://img.m2icondb.com/15020.png"},
    { name: "Sárkánytűz (b)", price: 1,price_yang: 30_000_000, group:'alkimia' , icon:"https://img.m2icondb.com/100700.png"},
    { name: "Legendás Sárkány Gáránát", price: 1,price_yang:80_000_000, group:'alkimia', icon:"https://img.m2icondb.com/154000.png"},
    { name: "Mítikus Sárkány Gáránát", price: 5, price_yang: 50_000_000, group:'alkimia', icon:"https://img.m2icondb.com/155000.png"},
    { name: "Mítikus Sárkány Jáde", price: 5, price_yang: 80_000_000, group:'alkimia', icon:"https://img.m2icondb.com/135000.png"},
    { name: "Zen-bab", price_yang: 500_000, group:'alkimia', icon:"https://img.m2icondb.com/70102.png"},
    { name: "Zöld sárkány-bab", price_yang: 5_000_000, group:'alkimia', icon:"https://img.m2icondb.com/100300.png"},
    { name: "Kék sárkány-bab", price_yang: 8_000_000, group:'alkimia', icon:"https://img.m2icondb.com/100400.png"},
    { name: "Rózsaszín sárkány-bab", price_yang: 10_000_000, group:'alkimia', icon:"https://img.m2icondb.com/100500.png"},
  ]);

 const searchQuery = ref("");
  const selectedCategory = ref("");
  
  const filteredItems = computed(() => {
    if (searchQuery.value && searchQuery.value.trim() !== "") {
      return hungaryItems.value.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    if (selectedCategory.value && selectedCategory.value.trim() !== "") {
      return hungaryItems.value.filter(
        (item) => item.group === selectedCategory.value
      );
    }
    return hungaryItems.value;
  });
  function setCategory(category) {
    selectedCategory.value = category;
    searchQuery.value = "";
  }
  return {
    hungaryItems,
    searchQuery,
    selectedCategory,
    filteredItems,
    setCategory,
  };
});