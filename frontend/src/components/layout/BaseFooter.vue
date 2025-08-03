<template>
    <footer class="bg-gray-900 border-t-8 border-t-indigo-950/75 pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div class="w-full max-w-[90%] lg:max-w-7xl md:max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-8 mb-8">
                <div class="w-full sm:col-span-2 lg:col-span-1">
                    <router-link to="/">
                        <img src="../../assets/img/logos/GrayZone_logo.png" alt="GrayZone Life Hacks"
                            class="w-auto h-16 sm:h-24 object-contain mx-auto">
                        <p class="text-gray-200 text-sm font-semibold mt-2 text-center italic">
                            Smart shopping before moving
                        </p>
                        <p class="text-gray-400 text-sm mt-1 text-center">
                            Save time, money and effort with us. Check and calculate all item's price fast.
                        </p>
                    </router-link>
                </div>

                <div class="w-full sm:col-span-2 mx-auto lg:col-span-2">
                    <div class="grid grid-cols-2 gap-4 sm:gap-8">
                        <div class="text-center">
                            <h3 class="text-white font-semibold mb-4">Tippek & Trükkök</h3>
                            <ul class="space-y-2">
                                <li>
                                    <RouterLink to="/marketsearch"
                                        class="text-gray-400 hover:text-pink-500 transition-colors duration-200 ease-in-out font-semibold">
                                        Market Searching</RouterLink>
                                </li>
                            </ul>
                        </div>

                        <div class="text-center ">
                            <h3 class="text-white font-semibold mb-4">Információk</h3>
                            <ul class="space-y-2">
                                <li><a href="#"
                                        class="text-gray-400 hover:text-pink-500 transition-colors duration-200 ease-in-out font-semibold">About
                                        Us</a></li>
                                <li><a href="#"
                                        class="text-gray-400 hover:text-pink-500 transition-colors duration-200 ease-in-out font-semibold">Who
                                        We Are</a></li>
                                <li><a href="#"
                                        class="text-gray-400 hover:text-pink-500 transition-colors duration-200 ease-in-out font-semibold">Support</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="w-full sm:col-span-2 lg:col-span-1">
                    <p class="text-white font-semibold mb-4 text-center">Íratkozz fel, hogy elsőként értesülj!</p>
                    <div class="flex max-w-xs mx-auto mb-8 lg:mb-4 ">
                        <input type="email" placeholder="Email címed"
                            class="bg-gray-800 text-gray-300 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500 flex-grow w-full">
                        <button
                            class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-r-lg transition-colors">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <p class="text-gray-400 text-sm px-2 text-center lg:text-left">
                        *Feliratkozással hozzájárulsz az <u class="underline-offset-2 italic">adatkezelési
                            tájékoztatóban</u> foglaltakhoz.
                    </p>
                </div>
            </div>

            <div class="border-t border-gray-800 pt-6 sm:pt-8">
                <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p class="text-gray-400 text-sm text-center sm:text-left">
                        © 2025 GrayZone Life Hacks. Minden jog fenntartva.
                    </p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors">
                            <i class="fa-brands fa-tiktok"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
