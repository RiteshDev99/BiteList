(async () => {
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b/698184b543b1c97be96155bf/latest');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    const items = json.record?.data ?? [];
    const cats = Array.from(new Set(items.map(i => (i.category ?? 'Unknown').toString())));
    console.log('Categories:', cats);
  } catch (err) {
    console.error('Error:', err.message || err);
  }
})();
