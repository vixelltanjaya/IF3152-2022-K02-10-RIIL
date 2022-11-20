const productName = document.getElementById('nama');
const productCategory = document.getElementById('kategori');
const productPrice = document.getElementById('harga');
const productSupplier = document.getElementById('supplier');
const productPhone = document.getElementById('telp');
const productImage = document.getElementById('product-gambar');
const labelImage = document.getElementById('label-gambar');
const productQuantity = document.getElementById('kuantitas');
const plus_quantity = document.getElementById('plus-kuantitas');
const minus_quantity = document.getElementById('minus-kuantitas');
const productSize = document.getElementById('ukuran');
const productSizeLabel = document.getElementById('ukuran-label')
const plus_size = document.getElementById('plus-size');
const minus_size = document.getElementById('minus-size');
const btnSubmit = document.getElementById('btn-submit');
const modalSuccess = document.getElementById('add-modal')


const getProductId = () => {
  const queryString = new URLSearchParams(window.location.search)
  return queryString.get('id')
}

// const formatRupiah = (angka) => {
//   const prefix = "Rp. ";
//   var number_string = angka.replace(/[^,\d]/g, '').toString(),
//   split   		= number_string.split(','),
//   sisa     		= split[0].length % 3,
//   rupiah     		= split[0].substr(0, sisa),
//   ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

//   // tambahkan titik jika yang di input sudah menjadi angka ribuan
//   if(ribuan){
//     separator = sisa ? '.' : '';
//     rupiah += separator + ribuan.join('.');
//   }

//   rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
//   return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
// }

plus_quantity.addEventListener('click', () => {
  productQuantity.value = parseInt(productQuantity.value) + 1;
})

minus_quantity.addEventListener('click', () => {
  if(productQuantity.value <= 0) productQuantity.value = 0;
  else productQuantity.value -= 1;
})

plus_size.addEventListener('click', () => {
  productSize.value = parseInt(productSize.value) + 1;
})

minus_size.addEventListener('click', () => {
  if(productSize.value <= 0) productSize.value = 0;
  else productSize.value -= 1;
})

const productId = getProductId();

productImage.addEventListener('change', e => {
  labelImage.innerHTML = e.target.value.replace(/.*[\/\\]/, '');
})

btnSubmit.addEventListener('click', () => {
  let formData = new FormData();
  formData.append("nama", productName.value);
  formData.append("kategori", productCategory.value);
  formData.append("ukuran", productSize.value + " " + productSizeLabel.value);
  const gambar = new File([productImage.files[0]], productName.value + "." + productImage.files[0].name.slice((productImage.files[0].name.lastIndexOf(".") - 1 >>> 0) + 2));
  formData.append("file", gambar);
  formData.append("harga", parseInt(productPrice.value));
  formData.append("supplier", productSupplier.value);
  formData.append("telp", productPhone.value[0] == '0' ? parseInt('62' + productPhone.value.substring(1)) : parseInt(productPhone.value));
  formData.append("kuantitas", parseInt(productQuantity.value))
  fetch('http://127.0.0.1:5000/add-produk', {
    method: "POST",       
    body: formData})    
  .then(response => response.json())
  .then(response => modalSuccess.style.display = "block")
})