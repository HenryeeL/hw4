import { useState, useMemo, useCallback } from "react";

const recipes = [
  { id: 1, name: "Classic Spaghetti Carbonara", emoji: "🍝", time: 25, difficulty: "Medium", ingredients: ["spaghetti", "eggs", "bacon", "parmesan", "black pepper"], tags: [], instructions: "Cook spaghetti according to package directions. Fry bacon until crispy. Mix eggs and parmesan in a bowl. Drain pasta, reserving some water. Mix hot pasta with egg mixture off heat, adding pasta water to create a creamy sauce. Add bacon and pepper. Serve immediately." },
  { id: 2, name: "Mediterranean Quinoa Bowl", emoji: "🥗", time: 20, difficulty: "Easy", ingredients: ["quinoa", "cucumber", "tomatoes", "olive oil", "feta", "lemon"], tags: ["vegetarian"], instructions: "Cook quinoa and let cool. Dice cucumber and tomatoes. Toss with olive oil and lemon juice. Top with crumbled feta. Season with salt and oregano." },
  { id: 3, name: "Thai Red Curry", emoji: "🍛", time: 35, difficulty: "Medium", ingredients: ["chicken", "coconut milk", "red curry paste", "bell peppers", "rice", "basil"], tags: ["gluten-free"], instructions: "Sauté curry paste in oil. Add chicken and cook through. Pour in coconut milk and simmer. Add sliced bell peppers. Serve over steamed rice with fresh basil." },
  { id: 4, name: "Vegetable Stir Fry", emoji: "🍳", time: 15, difficulty: "Easy", ingredients: ["broccoli", "carrots", "soy sauce", "garlic", "ginger", "rice", "sesame oil"], tags: ["vegan"], instructions: "Heat sesame oil in a wok. Stir-fry garlic and ginger. Add broccoli and carrots. Splash soy sauce. Cook until tender-crisp. Serve over rice." },
  { id: 5, name: "Classic Margherita Pizza", emoji: "🍕", time: 30, difficulty: "Medium", ingredients: ["pizza dough", "tomatoes", "mozzarella", "basil", "olive oil"], tags: ["vegetarian"], instructions: "Roll out dough. Spread crushed tomatoes. Add sliced mozzarella. Bake at 450°F for 12-15 minutes. Top with fresh basil and olive oil drizzle." },
  { id: 6, name: "Chicken Caesar Salad", emoji: "🥬", time: 20, difficulty: "Easy", ingredients: ["chicken breast", "romaine", "parmesan", "croutons", "caesar dressing"], tags: [], instructions: "Grill chicken breast and slice. Chop romaine lettuce. Toss with Caesar dressing and croutons. Top with shaved parmesan." },
  { id: 7, name: "Black Bean Tacos", emoji: "🌮", time: 20, difficulty: "Easy", ingredients: ["black beans", "tortillas", "avocado", "lime", "cilantro", "onion"], tags: ["vegan", "gluten-free"], instructions: "Warm and season black beans with cumin and chili. Heat tortillas. Mash avocado with lime. Assemble tacos with beans, guacamole, diced onion, and cilantro." },
  { id: 8, name: "Mushroom Risotto", emoji: "🍄", time: 45, difficulty: "Hard", ingredients: ["arborio rice", "mushrooms", "onion", "white wine", "parmesan", "butter"], tags: ["vegetarian", "gluten-free"], instructions: "Sauté mushrooms and set aside. Cook onion in butter. Add rice and toast. Deglaze with wine. Add warm broth one ladle at a time, stirring constantly. Fold in mushrooms and parmesan." },
  { id: 9, name: "Grilled Salmon", emoji: "🐟", time: 25, difficulty: "Medium", ingredients: ["salmon", "lemon", "garlic", "dill", "olive oil", "asparagus"], tags: ["gluten-free", "dairy-free"], instructions: "Marinate salmon with lemon, garlic, dill, and olive oil. Grill on medium-high for 4-5 minutes per side. Grill asparagus alongside. Serve with lemon wedges." },
  { id: 10, name: "Caprese Sandwich", emoji: "🥪", time: 10, difficulty: "Easy", ingredients: ["ciabatta", "mozzarella", "tomatoes", "basil", "balsamic"], tags: ["vegetarian"], instructions: "Slice ciabatta and toast lightly. Layer fresh mozzarella and tomato slices. Add basil leaves. Drizzle with balsamic glaze and olive oil." },
  { id: 11, name: "Lentil Soup", emoji: "🍲", time: 40, difficulty: "Easy", ingredients: ["lentils", "carrots", "celery", "onion", "garlic", "cumin"], tags: ["vegan", "gluten-free", "dairy-free"], instructions: "Sauté onion, carrots, and celery. Add garlic and cumin. Pour in lentils and broth. Simmer for 30 minutes until lentils are tender. Season and serve." },
  { id: 12, name: "Beef Tacos", emoji: "🌮", time: 25, difficulty: "Easy", ingredients: ["ground beef", "taco seasoning", "tortillas", "lettuce", "cheese", "salsa"], tags: [], instructions: "Brown ground beef with taco seasoning. Warm tortillas. Assemble with beef, shredded lettuce, cheese, and salsa." },
  { id: 13, name: "Pad Thai", emoji: "🍜", time: 30, difficulty: "Medium", ingredients: ["rice noodles", "shrimp", "peanuts", "bean sprouts", "lime", "fish sauce", "eggs"], tags: ["gluten-free", "dairy-free"], instructions: "Soak rice noodles. Stir-fry shrimp and set aside. Scramble eggs. Add noodles, fish sauce, and tamarind. Toss everything together. Top with peanuts, bean sprouts, and lime." },
  { id: 14, name: "Greek Salad", emoji: "🥒", time: 10, difficulty: "Easy", ingredients: ["cucumber", "tomatoes", "red onion", "olives", "feta", "olive oil"], tags: ["vegetarian", "gluten-free"], instructions: "Chop cucumber, tomatoes, and red onion. Add olives and crumbled feta. Dress with olive oil, lemon juice, and oregano." },
  { id: 15, name: "Chicken Tikka Masala", emoji: "🍛", time: 45, difficulty: "Medium", ingredients: ["chicken", "yogurt", "tomato sauce", "cream", "garam masala", "rice"], tags: ["gluten-free"], instructions: "Marinate chicken in yogurt and spices. Grill or bake chicken. Simmer tomato sauce with cream and garam masala. Add chicken to sauce. Serve over basmati rice." },
  { id: 16, name: "Avocado Toast", emoji: "🥑", time: 10, difficulty: "Easy", ingredients: ["bread", "avocado", "lime", "red pepper flakes", "eggs"], tags: ["vegetarian", "dairy-free"], instructions: "Toast bread until golden. Mash avocado with lime and salt. Spread on toast. Top with a poached or fried egg and red pepper flakes." },
  { id: 17, name: "Banana Smoothie Bowl", emoji: "🍌", time: 10, difficulty: "Easy", ingredients: ["banana", "berries", "granola", "almond milk", "honey"], tags: ["vegetarian", "gluten-free", "dairy-free"], instructions: "Blend frozen banana with almond milk until thick. Pour into bowl. Top with berries, granola, and a drizzle of honey." },
  { id: 18, name: "Eggplant Parmesan", emoji: "🍆", time: 50, difficulty: "Hard", ingredients: ["eggplant", "marinara", "mozzarella", "parmesan", "breadcrumbs", "eggs"], tags: ["vegetarian"], instructions: "Slice and salt eggplant. Bread with flour, egg, and breadcrumbs. Fry until golden. Layer with marinara and cheeses. Bake at 375°F for 25 minutes." },
  { id: 19, name: "Shrimp Scampi", emoji: "🦐", time: 20, difficulty: "Medium", ingredients: ["shrimp", "garlic", "white wine", "butter", "lemon", "linguine", "parsley"], tags: [], instructions: "Cook linguine. Sauté garlic in butter. Add shrimp and cook. Deglaze with wine and lemon juice. Toss with pasta and parsley." },
  { id: 20, name: "Veggie Buddha Bowl", emoji: "🥦", time: 25, difficulty: "Easy", ingredients: ["sweet potato", "chickpeas", "kale", "tahini", "quinoa", "avocado"], tags: ["vegan", "gluten-free", "dairy-free"], instructions: "Roast sweet potato and chickpeas with spices. Cook quinoa. Massage kale with olive oil. Assemble bowls and drizzle with tahini sauce. Top with sliced avocado." },
  { id: 21, name: "Chocolate Lava Cake", emoji: "🍫", time: 25, difficulty: "Hard", ingredients: ["dark chocolate", "butter", "eggs", "sugar", "flour"], tags: ["vegetarian"], instructions: "Melt chocolate and butter. Whisk eggs and sugar. Fold in chocolate mixture and flour. Pour into greased ramekins. Bake at 425°F for 12 minutes. Invert onto plates." },
  { id: 22, name: "Tiramisu", emoji: "☕", time: 30, difficulty: "Medium", ingredients: ["mascarpone", "espresso", "ladyfingers", "cocoa powder", "eggs", "sugar"], tags: ["vegetarian"], instructions: "Whisk egg yolks with sugar, fold in mascarpone. Dip ladyfingers in espresso. Layer in dish alternating with cream. Dust with cocoa. Chill for 4 hours." },
  { id: 23, name: "Berry Crumble", emoji: "🫐", time: 40, difficulty: "Easy", ingredients: ["mixed berries", "oats", "butter", "brown sugar", "flour", "cinnamon"], tags: ["vegetarian"], instructions: "Toss berries with sugar and place in baking dish. Mix oats, flour, butter, brown sugar, and cinnamon for topping. Sprinkle over berries. Bake at 375°F for 30 minutes." },
  { id: 24, name: "Mango Sticky Rice", emoji: "🥭", time: 35, difficulty: "Medium", ingredients: ["sticky rice", "mango", "coconut milk", "sugar", "salt"], tags: ["vegan", "gluten-free", "dairy-free"], instructions: "Soak and steam sticky rice. Heat coconut milk with sugar and salt. Pour half over cooked rice. Slice mango. Serve rice with mango and remaining coconut sauce." },
  { id: 25, name: "Panna Cotta", emoji: "🍮", time: 20, difficulty: "Medium", ingredients: ["heavy cream", "sugar", "vanilla", "gelatin", "berries"], tags: ["vegetarian", "gluten-free"], instructions: "Bloom gelatin in water. Heat cream with sugar and vanilla. Stir in gelatin until dissolved. Pour into molds. Chill for 4 hours. Unmold and top with fresh berries." },
  { id: 26, name: "Apple Pie Bites", emoji: "🍎", time: 30, difficulty: "Easy", ingredients: ["apples", "puff pastry", "cinnamon", "sugar", "butter", "nutmeg"], tags: ["vegetarian"], instructions: "Dice apples and cook with butter, sugar, cinnamon, and nutmeg. Cut pastry into squares. Fill with apple mixture and fold. Bake at 400°F for 15 minutes until golden." },
  { id: 27, name: "Coconut Curry Soup", emoji: "🥥", time: 30, difficulty: "Easy", ingredients: ["coconut milk", "sweet potato", "spinach", "curry powder", "onion", "garlic"], tags: ["vegan", "gluten-free", "dairy-free"], instructions: "Sauté onion and garlic. Add curry powder. Pour in coconut milk and broth. Add cubed sweet potato. Simmer until tender. Stir in spinach." },
  { id: 28, name: "Bruschetta", emoji: "🍅", time: 15, difficulty: "Easy", ingredients: ["baguette", "tomatoes", "basil", "garlic", "olive oil", "balsamic"], tags: ["vegan", "dairy-free"], instructions: "Toast baguette slices. Dice tomatoes and mix with minced garlic, basil, olive oil, and balsamic. Spoon onto toasted bread. Serve immediately." },
  { id: 29, name: "Falafel Wrap", emoji: "🧆", time: 35, difficulty: "Medium", ingredients: ["chickpeas", "pita", "tahini", "lettuce", "tomatoes", "onion", "parsley"], tags: ["vegan", "dairy-free"], instructions: "Blend chickpeas with parsley, onion, and spices. Form into balls and fry until golden. Warm pita. Assemble with falafel, lettuce, tomatoes, and tahini drizzle." },
  { id: 30, name: "Crème Brûlée", emoji: "🍯", time: 50, difficulty: "Hard", ingredients: ["heavy cream", "egg yolks", "sugar", "vanilla"], tags: ["vegetarian", "gluten-free"], instructions: "Heat cream with vanilla. Whisk yolks with sugar. Temper yolks with hot cream. Pour into ramekins. Bake in water bath at 325°F for 45 min. Chill, then torch sugar on top." },
  { id: 31, name: "Pesto Pasta", emoji: "🌿", time: 20, difficulty: "Easy", ingredients: ["pasta", "basil", "pine nuts", "parmesan", "garlic", "olive oil"], tags: ["vegetarian"], instructions: "Cook pasta al dente. Blend basil, pine nuts, garlic, parmesan, and olive oil into pesto. Toss hot pasta with pesto. Serve with extra parmesan." },
  { id: 32, name: "Chickpea Salad", emoji: "🫘", time: 15, difficulty: "Easy", ingredients: ["chickpeas", "cucumber", "red onion", "parsley", "lemon", "olive oil"], tags: ["vegan", "gluten-free", "dairy-free"], instructions: "Drain and rinse chickpeas. Dice cucumber and red onion. Chop parsley. Toss everything with lemon juice and olive oil. Season with salt, pepper, and cumin." },
];

const diffColors = { Easy: "bg-green-100 text-green-700", Medium: "bg-yellow-100 text-yellow-700", Hard: "bg-red-100 text-red-700" };
const tagColors = { vegetarian: "bg-green-500", vegan: "bg-emerald-500", "gluten-free": "bg-blue-500", "dairy-free": "bg-purple-500" };
const filters = ["vegetarian", "vegan", "gluten-free", "dairy-free"];

export default function RecipeFinder() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavs, setShowFavs] = useState(false);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(8);
  const [showAdd, setShowAdd] = useState(false);
  const [customRecipes, setCustomRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ name: "", emoji: "🍽️", time: 30, difficulty: "Easy", ingredients: "", tags: [], instructions: "" });

  const allRecipes = [...recipes, ...customRecipes];

  const filtered = useMemo(() => {
    let r = allRecipes;
    if (search.trim()) {
      const terms = search.toLowerCase().split(",").map(s => s.trim()).filter(Boolean);
      r = r.filter(rec => terms.some(t => rec.ingredients.some(i => i.toLowerCase().includes(t)) || rec.name.toLowerCase().includes(t)));
    }
    if (activeFilters.length > 0) {
      r = r.filter(rec => activeFilters.every(f => rec.tags.includes(f)));
    }
    if (showFavs) {
      r = r.filter(rec => favorites.includes(rec.id));
    }
    return r;
  }, [search, activeFilters, showFavs, favorites, customRecipes]);

  const toggleFilter = (f) => setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  const toggleFav = (id, e) => { e?.stopPropagation(); setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); };

  const addRecipe = () => {
    if (!newRecipe.name.trim() || !newRecipe.ingredients.trim()) return;
    const r = { ...newRecipe, id: Date.now(), ingredients: newRecipe.ingredients.split(",").map(s => s.trim()).filter(Boolean) };
    setCustomRecipes(prev => [...prev, r]);
    setNewRecipe({ name: "", emoji: "🍽️", time: 30, difficulty: "Easy", ingredients: "", tags: [], instructions: "" });
    setShowAdd(false);
  };

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #f0f9ff 100%)" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1, #818cf8)", padding: "28px 24px 24px", color: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, display: "flex", alignItems: "center", gap: 10 }}>🍳 Recipe Finder</div>
            <p style={{ opacity: 0.9, marginTop: 4, fontSize: 15 }}>Search recipes by ingredients you have at home</p>
            <p style={{ opacity: 0.7, fontSize: 13, marginTop: 2 }}>💡 Type ingredients, filter by diet, or browse all recipes</p>
          </div>
          <button onClick={() => setShowAdd(true)} style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.5)", color: "white", padding: "10px 20px", borderRadius: 12, cursor: "pointer", fontWeight: 600, fontSize: 14, backdropFilter: "blur(4px)" }}>+ Add Recipe</button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        {/* Search */}
        <div style={{ marginBottom: 8 }}>
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>🔍 Search by Ingredients</p>
          <div style={{ position: "relative" }}>
            <input value={search} onChange={e => { setSearch(e.target.value); setVisible(8); }} placeholder="Try: chicken, rice, tomatoes..." style={{ width: "100%", padding: "14px 16px 14px 44px", borderRadius: 14, border: "2px solid #e0e7ff", fontSize: 16, outline: "none", boxSizing: "border-box", background: "white", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#818cf8"} onBlur={e => e.target.style.borderColor = "#e0e7ff"} />
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18, opacity: 0.4 }}>🔍</span>
            {search && <button onClick={() => { setSearch(""); setVisible(8); }} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "#eef2ff", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#6366f1" }}>✕</button>}
          </div>
          <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>💡 Enter one or more ingredients separated by commas. Results update as you type.</p>
        </div>

        {/* Search active badge */}
        {search.trim() && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eef2ff", padding: "6px 12px", borderRadius: 20, fontSize: 13, color: "#6366f1", marginBottom: 12, fontWeight: 500 }}>
            🔍 Searching for: "{search}" <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#6366f1" }}>✕</button>
          </div>
        )}

        {/* Filters */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>🏷️ Filter by Dietary Preferences</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button onClick={() => { setShowFavs(!showFavs); setVisible(8); }} style={{ padding: "8px 16px", borderRadius: 20, border: showFavs ? "2px solid #ec4899" : "2px solid #e5e7eb", background: showFavs ? "#fdf2f8" : "white", color: showFavs ? "#ec4899" : "#6b7280", cursor: "pointer", fontWeight: 600, fontSize: 13, transition: "all 0.2s" }}>♡ My Favorites{favorites.length > 0 && ` (${favorites.length})`}</button>
            {filters.map(f => {
              const active = activeFilters.includes(f);
              return <button key={f} onClick={() => { toggleFilter(f); setVisible(8); }} style={{ padding: "8px 16px", borderRadius: 20, border: active ? "2px solid #6366f1" : "2px solid #e5e7eb", background: active ? "#eef2ff" : "white", color: active ? "#6366f1" : "#6b7280", cursor: "pointer", fontWeight: 600, fontSize: 13, textTransform: "capitalize", transition: "all 0.2s" }}>{f}</button>;
            })}
          </div>
        </div>

        {/* Count */}
        <p style={{ fontWeight: 700, fontSize: 15, color: "#374151", marginBottom: 6 }}>
          Found <span style={{ color: "#6366f1", fontSize: 22 }}>{filtered.length}</span> recipes
          {search.trim() && <span style={{ fontWeight: 400, color: "#9ca3af", fontSize: 13 }}> matching "{search}"</span>}
        </p>

        {filtered.length > 0 && <p style={{ background: "#fef9c3", padding: "8px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16, color: "#92400e" }}>👆 <strong>Click any recipe card</strong> to view full details and cooking instructions</p>}

        {/* Cards */}
        {shown.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 18, fontWeight: 600, color: "#6b7280" }}>No recipes found</p>
            <p style={{ fontSize: 14, marginTop: 4 }}>Try different ingredients or remove some filters</p>
            <button onClick={() => { setSearch(""); setActiveFilters([]); setShowFavs(false); setVisible(8); }} style={{ marginTop: 16, padding: "10px 24px", background: "#6366f1", color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 600 }}>Show All Recipes</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {shown.map(r => (
              <div key={r.id} onClick={() => setSelected(r)} style={{ background: "white", borderRadius: 16, overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.15)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}>
                <div style={{ background: "linear-gradient(135deg, #818cf8, #a78bfa)", padding: "28px 0", textAlign: "center", fontSize: 48, position: "relative" }}>
                  {r.emoji}
                  <button onClick={e => toggleFav(r.id, e)} style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.3)", border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>{favorites.includes(r.id) ? "❤️" : "🤍"}</button>
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#1f2937" }}>{r.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                    <span style={{ fontSize: 13, color: "#6b7280" }}>⏱ {r.time} mins</span>
                    <span className={diffColors[r.difficulty]} style={{ fontSize: 11, padding: "2px 10px", borderRadius: 12, fontWeight: 600 }}>{r.difficulty}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8, textTransform: "uppercase", fontWeight: 600, letterSpacing: 0.5 }}>Ingredients:</p>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{r.ingredients.slice(0, 4).join(", ")}{r.ingredients.length > 4 ? "..." : ""}</p>
                  {r.tags.length > 0 && (
                    <div style={{ display: "flex", gap: 4, marginTop: 10, flexWrap: "wrap" }}>
                      {r.tags.map(t => <span key={t} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 8, color: "white", fontWeight: 500, background: t === "vegetarian" ? "#22c55e" : t === "vegan" ? "#10b981" : t === "gluten-free" ? "#3b82f6" : "#8b5cf6" }}>{t}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show More */}
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button onClick={() => setVisible(v => v + 8)} style={{ padding: "12px 32px", background: "linear-gradient(135deg, #6366f1, #818cf8)", color: "white", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 15, boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}>
              Load 8 More Recipes ({filtered.length - visible} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16, backdropFilter: "blur(4px)" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 20, maxWidth: 520, width: "100%", maxHeight: "85vh", overflow: "auto", position: "relative" }}>
            <div style={{ background: "linear-gradient(135deg, #818cf8, #a78bfa)", padding: "36px 0", textAlign: "center", fontSize: 64, position: "relative", borderRadius: "20px 20px 0 0" }}>
              {selected.emoji}
              <button onClick={e => toggleFav(selected.id, e)} style={{ position: "absolute", top: 14, right: 50, background: "rgba(255,255,255,0.3)", border: "none", borderRadius: "50%", width: 38, height: 38, cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>{favorites.includes(selected.id) ? "❤️" : "🤍"}</button>
              <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.3)", border: "none", borderRadius: "50%", width: 38, height: 38, cursor: "pointer", fontSize: 18, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
            <div style={{ padding: "20px 24px 28px" }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: "#1f2937", textAlign: "center" }}>{selected.name}</h2>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 10 }}>
                <span style={{ fontSize: 14, color: "#6b7280" }}>⏱ {selected.time} mins</span>
                <span className={diffColors[selected.difficulty]} style={{ fontSize: 12, padding: "2px 12px", borderRadius: 12, fontWeight: 600 }}>{selected.difficulty}</span>
              </div>
              {selected.tags.length > 0 && <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>{selected.tags.map(t => <span key={t} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 8, color: "white", fontWeight: 500, background: t === "vegetarian" ? "#22c55e" : t === "vegan" ? "#10b981" : t === "gluten-free" ? "#3b82f6" : "#8b5cf6" }}>{t}</span>)}</div>}
              <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 20, color: "#374151" }}>📝 Ingredients</h3>
              <ul style={{ paddingLeft: 20, margin: "8px 0" }}>{selected.ingredients.map((ing, i) => <li key={i} style={{ fontSize: 14, color: "#4b5563", padding: "3px 0", textTransform: "capitalize" }}>{ing}</li>)}</ul>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 20, color: "#374151" }}>👨‍🍳 Instructions</h3>
              <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.7 }}>{selected.instructions}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Recipe Modal */}
      {showAdd && (
        <div onClick={() => setShowAdd(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16, backdropFilter: "blur(4px)" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 20, maxWidth: 480, width: "100%", padding: 28, maxHeight: "85vh", overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>➕ Add New Recipe</h2>
              <button onClick={() => setShowAdd(false)} style={{ background: "#f3f4f6", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 14 }}>✕</button>
            </div>
            {[
              { label: "Recipe Name", key: "name", ph: "e.g., Mom's Pasta" },
              { label: "Emoji", key: "emoji", ph: "e.g., 🍕" },
              { label: "Cooking Time (minutes)", key: "time", ph: "30", type: "number" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>{f.label}</label>
                <input value={newRecipe[f.key]} onChange={e => setNewRecipe(p => ({ ...p, [f.key]: f.type === "number" ? +e.target.value : e.target.value }))} placeholder={f.ph} type={f.type || "text"} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Difficulty</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["Easy", "Medium", "Hard"].map(d => <button key={d} onClick={() => setNewRecipe(p => ({ ...p, difficulty: d }))} style={{ padding: "8px 18px", borderRadius: 10, border: newRecipe.difficulty === d ? "2px solid #6366f1" : "2px solid #e5e7eb", background: newRecipe.difficulty === d ? "#eef2ff" : "white", color: newRecipe.difficulty === d ? "#6366f1" : "#6b7280", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{d}</button>)}
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Ingredients (comma-separated)</label>
              <input value={newRecipe.ingredients} onChange={e => setNewRecipe(p => ({ ...p, ingredients: e.target.value }))} placeholder="chicken, rice, garlic..." style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Dietary Tags</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {filters.map(f => <button key={f} onClick={() => setNewRecipe(p => ({ ...p, tags: p.tags.includes(f) ? p.tags.filter(x => x !== f) : [...p.tags, f] }))} style={{ padding: "6px 14px", borderRadius: 16, border: newRecipe.tags.includes(f) ? "2px solid #6366f1" : "2px solid #e5e7eb", background: newRecipe.tags.includes(f) ? "#eef2ff" : "white", color: newRecipe.tags.includes(f) ? "#6366f1" : "#6b7280", cursor: "pointer", fontWeight: 600, fontSize: 12, textTransform: "capitalize" }}>{f}</button>)}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Instructions</label>
              <textarea value={newRecipe.instructions} onChange={e => setNewRecipe(p => ({ ...p, instructions: e.target.value }))} placeholder="Step by step instructions..." rows={3} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 14, outline: "none", boxSizing: "border-box", resize: "vertical" }} />
            </div>
            <button onClick={addRecipe} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #6366f1, #818cf8)", color: "white", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>Add Recipe</button>
          </div>
        </div>
      )}
    </div>
  );
}