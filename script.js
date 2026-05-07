:root {
    --primary: #f85606; /* Daraz Orange */
    --bg: #eff0f5;
    --white: #ffffff;
}

body { background-color: var(--bg); margin: 0; padding: 0; font-family: sans-serif; }

.top-nav { background: #212121; color: white; text-align: center; font-size: 12px; padding: 5px 0; }

.navbar { 
    display: flex; justify-content: space-between; align-items: center; 
    padding: 15px 10%; background: var(--white); sticky: top;
}

.logo { font-size: 28px; font-weight: bold; cursor: pointer; }
.logo span { color: var(--primary); }

.search-bar { display: flex; width: 50%; }
.search-bar input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 2px 0 0 2px; outline: none; }
.search-bar button { background: var(--primary); color: white; border: none; padding: 0 20px; cursor: pointer; }

.nav-icons { display: flex; gap: 25px; }
.icon-item { text-align: center; cursor: pointer; color: #757575; position: relative; }
.cart-count { position: absolute; top: -10px; right: -10px; background: var(--primary); color: white; padding: 2px 6px; border-radius: 50%; font-size: 10px; }

/* Banner */
.banner { padding: 10px 10%; }
.slider img { width: 100%; border-radius: 8px; height: 350px; object-fit: cover; }

/* Categories */
.categories { padding: 20px 10%; }
.cat-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 15px; }
.cat-item { background: white; padding: 20px; text-align: center; border-radius: 5px; cursor: pointer; transition: 0.3s; }
.cat-item:hover { box-shadow: 0 4px 10px rgba(0,0,0,0.1); color: var(--primary); }
.cat-item i { font-size: 30px; margin-bottom: 10px; }

/* Product Card */
.products { padding: 20px 10%; }
.section-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; }

.product-card { background: white; padding: 10px; border-radius: 3px; transition: 0.3s; cursor: pointer; }
.product-card:hover { box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
.product-card img { width: 100%; height: 180px; object-fit: contain; }
.product-card h4 { font-size: 14px; color: #212121; margin: 10px 0; height: 35px; overflow: hidden; }
.product-card .price { color: var(--primary); font-size: 18px; font-weight: bold; }
.product-card .old-price { font-size: 12px; color: #9e9e9e; text-decoration: line-through; margin-left: 5px; }
