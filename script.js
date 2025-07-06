const form = document.getElementById('productForm');
const tbody = document.querySelector('#productsTable tbody');
const spans = {
  subtotal: document.getElementById('totalSubtotal'),
  descuento: document.getElementById('totalDescuento'),
  isv: document.getElementById('totalISV'),
  total: document.getElementById('totalPagar'),
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const id = form.prodId.value,
        nombre = form.prodName.value,
        precio = parseFloat(form.prodPrice.value),
        qty = parseInt(form.prodQty.value),
        sub = precio * qty;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${id}</td>
    <td>${nombre}</td>
    <td>${precio.toFixed(2)}</td>
    <td>${qty}</td>
    <td class="sub">${sub.toFixed(2)}</td>
    <td><button class="btn btn-sm btn-danger btn-delete"><i class="fa fa-trash"></i></button></td>
  `;
  tbody.appendChild(row);
  actualizarTotales();
  form.reset();
});

tbody.addEventListener('click', e => {
  if (e.target.closest('.btn-delete')) {
    e.target.closest('tr').remove();
    actualizarTotales();
  }
});

function actualizarTotales() {
  const subs = [...tbody.querySelectorAll('.sub')]
    .reduce((sum, td) => sum + parseFloat(td.textContent), 0);
  const desc = subs * 0.10;
  const isv = subs * 0.15;
  const total = subs - desc + isv;

  spans.subtotal.textContent = subs.toFixed(2);
  spans.descuento.textContent = desc.toFixed(2);
  spans.isv.textContent = isv.toFixed(2);
  spans.total.textContent = total.toFixed(2);
}
