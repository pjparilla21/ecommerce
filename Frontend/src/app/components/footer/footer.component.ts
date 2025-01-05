import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template:`<div class="bg-black text-gray-400 py-8">
  <div class="container mx-auto px-6">
      <!-- Top Section: Links and Social Icons -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About Us -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">About Us</h3>
          <p class="text-sm">
            We are dedicated to providing the best online shopping experience with a wide range of quality products.
          </p>
        </div>
  
        <!-- Quick Links -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition duration-300">Home</a></li>
            <li><a href="#" class="hover:text-white transition duration-300">Shop</a></li>
            <li><a href="#" class="hover:text-white transition duration-300">Contact Us</a></li>
            <li><a href="#" class="hover:text-white transition duration-300">FAQs</a></li>
          </ul>
        </div>
  
        <!-- Follow Us -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition duration-300">
              <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .732.592 1.324 1.325 1.324h21.349c.733 0 1.325-.592 1.325-1.325v-21.35c0-.733-.592-1.325-1.325-1.325zm-12.15 18.252h-3.557v-9.633h3.557v9.633zm-1.779-10.992c-1.13 0-2.047-.917-2.047-2.047s.917-2.046 2.047-2.046c1.131 0 2.047.916 2.047 2.046s-.916 2.047-2.047 2.047zm11.675 10.992h-3.557v-4.794c0-1.141-.407-1.92-1.427-1.92-.778 0-1.242.524-1.446 1.031-.074.18-.093.432-.093.684v5v4.793h-3.557v-9.633h3.557v1.293c.471-.723 1.3-1.754 3.177-1.754 2.32 0 4.057 1.51 4.057 4.748v5.346z"/></svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition duration-300">
              <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.572 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.56-3.594-1.56-2.717 0-4.923 2.207-4.923 4.917 0 .39.045.765.127 1.125-4.092-.205-7.72-2.165-10.15-5.144-.424.723-.666 1.562-.666 2.456 0 1.693.86 3.187 2.166 4.066-.798-.025-1.55-.245-2.205-.612v.061c0 2.364 1.678 4.342 3.911 4.791-.409.111-.841.171-1.287.171-.314 0-.621-.031-.921-.088.622 1.94 2.431 3.355 4.573 3.396-1.676 1.313-3.787 2.096-6.075 2.096-.394 0-.785-.023-1.17-.067 2.165 1.392 4.731 2.206 7.504 2.206 9.005 0 13.926-7.46 13.926-13.926 0-.211-.004-.423-.013-.634.961-.689 1.8-1.56 2.462-2.548l-.047-.02z"/></svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition duration-300">
              <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.572 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.56-3.594-1.56-2.717 0-4.923 2.207-4.923 4.917 0 .39.045.765.127 1.125-4.092-.205-7.72-2.165-10.15-5.144-.424.723-.666 1.562-.666 2.456 0 1.693.86 3.187 2.166 4.066-.798-.025-1.55-.245-2.205-.612v.061c0 2.364 1.678 4.342 3.911 4.791-.409.111-.841.171-1.287.171-.314 0-.621-.031-.921-.088.622 1.94 2.431 3.355 4.573 3.396-1.676 1.313-3.787 2.096-6.075 2.096-.394 0-.785-.023-1.17-.067 2.165 1.392 4.731 2.206 7.504 2.206 9.005 0 13.926-7.46 13.926-13.926 0-.211-.004-.423-.013-.634.961-.689 1.8-1.56 2.462-2.548l-.047-.02z"/></svg>
            </a>
          </div>
        </div>
      </div>
  
      <!-- Bottom Section: Copy -->
      <div class="mt-8 border-t border-gray-700 pt-4 text-center">
        <p class="text-sm">&copy; 2025 BrandName. All Rights Reserved.</p>
      </div>
    </div>


</div>`,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
