document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav menggunakan DOMContentLoaded, yang akan menghasilkan sidebar. kemudian menggunakan querySelectorAll untuk membuat
  // sidenav. side nav tersebut dibuat menjadi sebuah fungsi untuk side bar yaitu loadNav(). 
  var elems = document.querySelectorAll(".sidenav");
	  M.Sidenav.init(elems); 
		loadNav();
	 
	  function loadNav() {
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
		  if (this.status != 200) return;
	 
		  // Muat daftar tautan menu berdasarkan elemen yang ada pada halaman nav
		  document.querySelectorAll(".topnav, .sidenav").forEach(function(elm){
			elm.innerHTML = xhttp.responseText;
		   });
	  
		   // Daftarkan event listener untuk setiap tautan menu
			//untuk menggunakan sidenav harus tertaut terlebih dahulu ke halaman yang akan dituju
			//dibuatlah listener click pada list sidenav url
				 document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) { 
			elm.addEventListener("click", function(event) {
				
			  // Tutup sidenav
			  //menggunakan query selector untuk memilih hasil akhir kemudian sidenav akan menutup
			  // ketika berhasil berpindak ke page yg dituju
			  var sidenav = document.querySelector(".sidenav");
			  M.Sidenav.getInstance(sidenav).close();
	 
			  // Muat konten halaman yang dipanggil dengan menggunakan attribut href, maka akan mebukan page
			  // yang dituju oleh pengguna. yaitu ditampilkan dengan load page.
			  page = event.target.getAttribute("href").substr(1);
			  loadPage(page);
			});
		  });
		}
	  };
	  xhttp.open("GET", "nav.html", true);
	  xhttp.send();
	}
  
  
  var page = window.location.hash.substr(1);
	if (page == "") page = "home";
	loadPage(page);
	 
	function loadPage(page) {
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
		   var content = document.querySelector("#body-content");
		   if (this.status == 200) {
			 content.innerHTML = xhttp.responseText; 
		   } else if (this.status == 404) {
			 content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
		   } else {
			 content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
		   }
		   //page yang dituju akan memiliki status untuk hasil koneksi. ketika respon adalah 200 maka
		   //pagetersebut tidak ada error. tetaapi ada status error 404 yang atrinya halaman tidak ditemukan 
		   //dan untuk respon status lainnya adalah halaman tidak dapat diakses  
		 }
	   };
	   xhttp.open("GET", "pages/" + page + ".html", true);
	   xhttp.send();
	 } 
	 
	
 
}); 