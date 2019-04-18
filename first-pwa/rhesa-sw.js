var	CACHE_NAME	=	'rhesa-cache';
//nama cahce adalah rhesa-cache

var	urlsToCache	=	[
		'.',
		'pages/img/.',
		'index.html',
		'nav.html',
		'pages/about.html',
		'pages/contact.html',
		'pages/galeri.html',
		'pages/home.html',
		'pages/profil.html',
		'css/materialize.css',
		'css/materialize.min.css'
];
//kemudian dibuat variabel yang berguna untuk menampung halamn dan
//gambar dari page yang akan dijadikan file cache, daftar file yang 
//dijadikan cache adalah file html dan gambar png

self.addEventListener('install',	function(event)	{
		event.waitUntil(
				caches.open(CACHE_NAME)
				.then(function(cache)	{
						return	cache.addAll(urlsToCache);
				})
		);
});
//digunakan untuk install cache yang bernama rhesa-cache
//kemudian semua url direktori web menjadi sebuah cache



self.addEventListener('fetch',	function(event)	{
		event.respondWith(
				caches.match(event.request)
				.then(function(response)	{
						return	response	||	fetchAndCache(event.request);
				})
		);
});
//kemudian data cache difetching untuk dapat ditampilkan kembali ketika
//event cache diperlukan, yaitu ketika web page berada dalam posisi
//ofline

function	fetchAndCache(url)	{
		return	fetch(url)
		.then(function(response)	{
				//	digunakan untuk checkong ketika menerima respon ok dari 
				//web page cache yang telah dibuat
				if	(!response.ok)	{
						throw	Error(response.statusText);
				}
				return	caches.open(CACHE_NAME)
				.then(function(cache)	{
						cache.put(url,	response.clone());
						return	response;
				});
		})
		.catch(function(error)	{
				console.log('Request	failed:',	error);
				//	jika terjadi kegagalan ketika membuat cache, maka akan ditampilkan 
				//error 404 yang berarti error tidak ada jaringan dan tidak ada yg
				// ditampilkan
		});
}

self.addEventListener('install', function(event)	{
		console.log('Service worker installing...');
		//	TODO	3.4:	Skip	waiting
		self.skipWaiting();
});
//	I'm	a	new	service	worker
// 	file ini akan melakukan pembuatan sebuah event untuk
//	install service worker, log dari installing akan 
//  ditampilkan pada console log keterangan "service worker
//  istalling", kemudian file ini akan melakukan skip waiting
//  pada peroses istallasi 

self.addEventListener('activate', function(event)	{
		console.log('Service worker activating...');
});
//  kemudian pada event diatas dilakukan ketika service worker 
//  selesai dilakukan install, pada change log akan ditampilkan 
//  pesan "Service worker activating".

self.addEventListener('fetch',	function(event)	{
		console.log('Fetching:',	event.request.url);
});
//  ketika page atau web tersebut melakukan pindah page atau pergi
//  ke page lain, maka page tersebut akan dilakukan fetching untuk 
//  untuk disimpan dalam cache untuk dapat dibuka  kembali ketika 
//  page tersebut berada pada kondisi offline  