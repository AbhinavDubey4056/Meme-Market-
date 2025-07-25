let wallet = 1000;

function updateWalletDisplay() {
  document.getElementById("wallet-balance").innerText = wallet;
}

function loadMemes() {
  fetch("data/memes.json")
    .then(res => res.json())
    .then(memes => {
      const grid = document.getElementById("meme-grid");
      grid.innerHTML = "";
      memes.forEach(meme => {
        const card = document.createElement("div");
        card.className = "meme-card";

        card.innerHTML = `
          <img src="${meme.img}" alt="meme" />
          <div class="caption">${meme.caption}</div>
          <div class="p-2">
            <div>Price: ₹${meme.basePrice}</div>
            <div class="flex gap-2 mt-2">
              <button class="buy-btn bg-green-600 px-3 py-1 rounded" data-price="${meme.basePrice}">Buy</button>
              <button class="sell-btn bg-red-600 px-3 py-1 rounded" data-price="${meme.basePrice}">Sell</button>
            </div>
          </div>
        `;

        grid.appendChild(card);
      });

      document.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const price = parseInt(btn.dataset.price);
          if (wallet >= price) {
            wallet -= price;
            updateWalletDisplay();
            alert("Bought!");
          } else {
            alert("Not enough funds!");
          }
        });
      });

      document.querySelectorAll(".sell-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const price = parseInt(btn.dataset.price);
          wallet += price;
          updateWalletDisplay();
          alert("Sold!");
        });
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  updateWalletDisplay();
  loadMemes();
});
