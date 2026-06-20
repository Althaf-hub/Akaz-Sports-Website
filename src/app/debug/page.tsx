/**
 * DEBUG PAGE — /debug
 * Raw WooCommerce data verification. No components. No abstractions.
 * Delete this file when debugging is complete.
 */
export const dynamic = "force-dynamic"; // always server-render, never cache

export default async function DebugPage() {
  // ─── Step 1: Raw fetch — no abstraction layer ──────────────────────────────
  let products: Record<string, unknown>[] = [];
  let fetchError: string | null = null;
  let responseStatus: number | null = null;

  try {
    const res = await fetch(
      "https://akazsportshub.com/wp-json/wc/store/products",
      { cache: "no-store" }
    );
    responseStatus = res.status;

    if (!res.ok) {
      fetchError = `HTTP ${res.status} ${res.statusText}`;
    } else {
      const json = await res.json();
      products = Array.isArray(json) ? json : [];

      // ─── Step 2: Console logs ──────────────────────────────────────────────
      console.log("[DEBUG] Full products array:", json);
      console.log("[DEBUG] products[0]:", products[0]);
      console.log("[DEBUG] products[0].images:", (products[0] as Record<string, unknown>)?.images);
      console.log("[DEBUG] products[0].categories:", (products[0] as Record<string, unknown>)?.categories);
    }
  } catch (err) {
    fetchError = err instanceof Error ? err.message : String(err);
    console.error("[DEBUG] Fetch failed:", err);
  }

  const first5 = products.slice(0, 5);

  return (
    <div style={{ fontFamily: "monospace", padding: "2rem", background: "#0a0a0a", color: "#e5e5e5", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#fff" }}>
        🔍 WooCommerce API Debug
      </h1>
      <p style={{ color: "#888", marginBottom: "2rem", fontSize: "0.85rem" }}>
        Endpoint: <code style={{ color: "#60a5fa" }}>https://akazsportshub.com/wp-json/wc/store/products</code>
        &nbsp;|&nbsp; Cache: <code>no-store</code>
      </p>

      {/* ─── HTTP Status ──────────────────────────────────────────────────── */}
      <section style={{ marginBottom: "1.5rem" }}>
        <p>
          <strong>HTTP Status:</strong>{" "}
          <span style={{ color: responseStatus === 200 ? "#4ade80" : "#f87171" }}>
            {responseStatus ?? "N/A"}
          </span>
        </p>
      </section>

      {/* ─── Fetch Error ──────────────────────────────────────────────────── */}
      {fetchError && (
        <section style={{ background: "#450a0a", border: "1px solid #991b1b", padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
          <strong style={{ color: "#f87171" }}>❌ Fetch Error:</strong>
          <pre style={{ color: "#fca5a5", marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>{fetchError}</pre>
        </section>
      )}

      {/* ─── Product Count ────────────────────────────────────────────────── */}
      <section style={{ marginBottom: "2rem", padding: "1rem", background: "#111", borderRadius: "8px", border: "1px solid #222" }}>
        <p style={{ fontSize: "1.1rem" }}>
          <strong>Total products in response:</strong>{" "}
          <span style={{ color: products.length > 0 ? "#4ade80" : "#f87171", fontSize: "1.4rem" }}>
            {products.length}
          </span>
        </p>
        {products.length === 0 && !fetchError && (
          <p style={{ color: "#facc15", marginTop: "0.5rem" }}>
            ⚠️ API returned 200 but the array is empty. Check WooCommerce product visibility settings.
          </p>
        )}
      </section>

      {/* ─── First 5 Products ─────────────────────────────────────────────── */}
      {first5.length > 0 && (
        <section>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", borderBottom: "1px solid #333", paddingBottom: "0.5rem" }}>
            First {first5.length} Products
          </h2>

          {first5.map((product, idx) => {
            const images = product.images as { src?: string; alt?: string }[] | undefined;
            const categories = product.categories as { id?: number; name?: string; slug?: string }[] | undefined;
            const imageSrc = images?.[0]?.src;

            return (
              <div
                key={String(product.id ?? idx)}
                style={{
                  marginBottom: "2rem",
                  padding: "1.25rem",
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "8px",
                }}
              >
                {/* Metadata */}
                <table style={{ fontSize: "0.8rem", marginBottom: "1rem", width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td style={{ color: "#888", paddingRight: "1rem", paddingBottom: "4px" }}>id</td>
                      <td style={{ color: "#e5e5e5" }}>{String(product.id ?? "—")}</td>
                    </tr>
                    <tr>
                      <td style={{ color: "#888", paddingRight: "1rem", paddingBottom: "4px" }}>name</td>
                      <td style={{ color: "#e5e5e5" }}>{String(product.name ?? "—")}</td>
                    </tr>
                    <tr>
                      <td style={{ color: "#888", paddingRight: "1rem", paddingBottom: "4px" }}>slug</td>
                      <td style={{ color: "#e5e5e5" }}>{String(product.slug ?? "—")}</td>
                    </tr>
                    <tr>
                      <td style={{ color: "#888", paddingRight: "1rem", paddingBottom: "4px" }}>images.length</td>
                      <td style={{ color: images && images.length > 0 ? "#4ade80" : "#f87171" }}>
                        {images?.length ?? 0}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "#888", paddingRight: "1rem", paddingBottom: "4px" }}>images[0].src</td>
                      <td style={{ color: "#60a5fa", wordBreak: "break-all" }}>
                        {imageSrc ?? "⚠️ No image src"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "#888", paddingRight: "1rem" }}>categories</td>
                      <td style={{ color: categories && categories.length > 0 ? "#4ade80" : "#f87171" }}>
                        {categories && categories.length > 0
                          ? categories.map((c) => `${c.name} (id:${c.id})`).join(", ")
                          : "⚠️ No categories"}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Step 4: Use plain <img> — NOT Next.js <Image> */}
                {imageSrc ? (
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.5rem" }}>
                      ✅ Image (plain &lt;img&gt; — bypasses Next.js Image config):
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc}
                      alt={String(product.name ?? "")}
                      width="300"
                      style={{ border: "1px solid #333", borderRadius: "4px", display: "block" }}
                    />
                  </div>
                ) : (
                  <p style={{ color: "#f87171", fontSize: "0.85rem" }}>
                    ❌ No image src — product.images?.[0]?.src is undefined
                  </p>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* ─── Raw JSON of first product ────────────────────────────────────── */}
      {products.length > 0 && (
        <section style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", borderBottom: "1px solid #333", paddingBottom: "0.5rem" }}>
            Raw JSON — products[0]
          </h2>
          <pre
            style={{
              background: "#0d0d0d",
              border: "1px solid #1f1f1f",
              borderRadius: "8px",
              padding: "1rem",
              fontSize: "0.72rem",
              color: "#a3a3a3",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {JSON.stringify(products[0], null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}
