const products = [
  {name:"Free Fire",category:"game",icon:"🔥",desc:"Top up diamond Free Fire"},
  {name:"Mobile Legends",category:"game",icon:"⚔️",desc:"Diamond Mobile Legends"},
  {name:"PUBG Mobile",category:"game",icon:"🎯",desc:"UC PUBG Mobile"},
  {name:"Honor of Kings",category:"game",icon:"👑",desc:"Token Honor of Kings"},
  {name:"Voucher Game Lainnya",category:"game",icon:"🎮",desc:"Tanyakan ketersediaan voucher"},
  {name:"Pulsa",category:"pulsa",icon:"📱",desc:"Pulsa berbagai operator"},
  {name:"Paket Internet",category:"pulsa",icon:"🌐",desc:"Paket data internet"},
  {name:"Token Listrik",category:"digital",icon:"⚡",desc:"Token listrik prabayar"},
  {name:"Saldo E-wallet",category:"wallet",icon:"💳",desc:"Isi saldo dompet digital"}
];
const $ = (s)=>document.querySelector(s);
const $$ = (s)=>document.querySelectorAll(s);
const grid=$("#productGrid");
$("#year").textContent=new Date().getFullYear();

function showToast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
function openWhatsApp(message){
  const number=window.FAREL_CONFIG?.whatsappNumber||"";
  if(!number || number.includes("ISI_NOMOR")){
    showToast("Nomor WhatsApp admin belum diatur. Isi dulu di file config.js.");
    return;
  }
  const url=`https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url,"_blank","noopener,noreferrer");
}
function renderProducts(filter="all"){
  const list=filter==="all"?products:products.filter(p=>p.category===filter);
  grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-icon">${p.icon}</div><div class="product-info"><b>${p.name}</b><small>${p.desc}</small><em>Harga: konfirmasi admin</em></div><button class="product-order" data-product="${p.name}">Pesan</button></article>`).join("");
  $$(".product-order").forEach(btn=>btn.addEventListener("click",()=>openOrder(btn.dataset.product)));
}
renderProducts();

function navigate(page){
  $$(".page").forEach(p=>p.classList.remove("active"));
  const target=$("#page-"+page)||$("#page-home");target.classList.add("active");
  $$(".nav-link").forEach(a=>a.classList.toggle("active",a.dataset.page===page));
  $("#mainNav").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}
$$("[data-page]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();navigate(a.dataset.page)}));
$$("[data-goto]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.goto)));
$("#mobileMenu").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
$$("[data-category]").forEach(b=>b.addEventListener("click",()=>{navigate("products");setFilter(b.dataset.category)}));
function setFilter(filter){
  $$(".filter").forEach(f=>f.classList.toggle("active",f.dataset.filter===filter));
  renderProducts(filter);
}
$$(".filter").forEach(f=>f.addEventListener("click",()=>setFilter(f.dataset.filter)));

const auth=$("#authOverlay");
function openAuth(){auth.classList.add("open");auth.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeAuth(){auth.classList.remove("open");auth.setAttribute("aria-hidden","true");document.body.style.overflow=""}
$("#openLogin").addEventListener("click",openAuth);
$("#closeLogin").addEventListener("click",closeAuth);
$("#continueGuest").addEventListener("click",closeAuth);
auth.addEventListener("click",e=>{if(e.target===auth)closeAuth()});
let authMode="login";
$$(".auth-tab").forEach(tab=>tab.addEventListener("click",()=>{
  authMode=tab.dataset.auth;
  $$(".auth-tab").forEach(t=>t.classList.toggle("active",t===tab));
  const isRegister=authMode==="register";
  $("#authName").classList.toggle("hidden",!isRegister);
  $("#nameLabel").classList.toggle("hidden",!isRegister);
  $("#authPassword").autocomplete=isRegister?"new-password":"current-password";
}));
$("#authForm").addEventListener("submit",e=>{
  e.preventDefault();
  showToast("Login belum aktif. Website perlu backend akun yang aman.");
});

const order=$("#orderOverlay");
function openOrder(name){
  $("#selectedProduct").value=name;
  $("#orderTitle").textContent="Pesan "+name;
  $("#targetLabel").textContent=name.includes("Listrik")?"Nomor meter / ID pelanggan":(name.includes("Free Fire")||name.includes("Mobile")||name.includes("PUBG")||name.includes("Honor")?"ID game / User ID":"Nomor tujuan");
  $("#customerTarget").placeholder=name.includes("Listrik")?"Masukkan nomor meter": "Masukkan nomor atau ID tujuan";
  order.classList.add("open");order.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}
function closeOrder(){order.classList.remove("open");order.setAttribute("aria-hidden","true");document.body.style.overflow=""}
$("#closeOrder").addEventListener("click",closeOrder);
order.addEventListener("click",e=>{if(e.target===order)closeOrder()});
$("#orderForm").addEventListener("submit",e=>{
  e.preventDefault();
  const product=$("#selectedProduct").value;
  const name=$("#customerName").value.trim();
  const target=$("#customerTarget").value.trim();
  const detail=$("#customerDetail").value.trim();
  const payment=$("#paymentMethod").value;
  const msg=`Halo ${window.FAREL_CONFIG?.storeName||"FAREL STORE"}, saya ingin memesan:%0A`.replace("%0A","\n")
    +`\nProduk: ${product}\nNama: ${name}\nNomor tujuan / ID: ${target}\nPaket / nominal: ${detail}\nMetode pembayaran yang diinginkan: ${payment}\n\nMohon konfirmasi harga akhir dan cara pembayaran. Saya akan menunggu konfirmasi admin sebelum membayar.`;
  closeOrder();openWhatsApp(msg);
});
const adminMsg="Halo FAREL STORE, saya ingin bertanya tentang produk dan harga.";
$("#askAdmin").addEventListener("click",()=>openWhatsApp(adminMsg));
$("#contactAdmin").addEventListener("click",()=>openWhatsApp(adminMsg));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeAuth();closeOrder()}});
