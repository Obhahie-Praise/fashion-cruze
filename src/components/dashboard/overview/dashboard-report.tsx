/**
 * DashboardReport
 *
 * A structured PDF report built with @react-pdf/renderer.
 * Rendered server-side inside an API route and streamed to the client.
 *
 * Sections:
 *  - Cover (store name, date range, generated timestamp)
 *  - Key Metrics (revenue, profit, orders, customers, products)
 *  - Business Health (inventory, support, payments)
 *  - Top Categories
 *  - Low Stock Alerts
 *  - Recent Orders
 */

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ReportMetrics {
  revenue: number;
  profit: number;
  orders: number;
  activeCustomers: number;
  products: number;
  storeVisits: number;
}

export interface ReportHealthItem {
  label: string;
  status: string;
  message: string;
}

export interface ReportCategory {
  name: string;
  productCount: number;
}

export interface ReportLowStockItem {
  productName: string;
  variantName: string;
  quantity: number;
}

export interface ReportOrder {
  orderNumber: string;
  customerName: string;
  total: number;
  status: string;
  date: string;
}

export interface DashboardReportData {
  range: string;
  generatedAt: string;
  metrics: ReportMetrics;
  health: ReportHealthItem[];
  categories: ReportCategory[];
  lowStock: ReportLowStockItem[];
  recentOrders: ReportOrder[];
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const COLORS = {
  black: "#0a0a0a",
  gray900: "#111111",
  gray700: "#374151",
  gray500: "#6b7280",
  gray200: "#e5e7eb",
  gray100: "#f3f4f6",
  white: "#ffffff",
  accent: "#171717",
  green: "#166534",
  greenBg: "#dcfce7",
  yellow: "#854d0e",
  yellowBg: "#fef9c3",
  red: "#991b1b",
  redBg: "#fee2e2",
} as const;

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 48,
    paddingVertical: 40,
    fontFamily: "Helvetica",
    color: COLORS.black,
  },

  // ── Cover ──
  coverBand: {
    backgroundColor: COLORS.accent,
    marginHorizontal: -48,
    marginTop: -40,
    paddingHorizontal: 48,
    paddingVertical: 32,
    marginBottom: 32,
  },
  coverTitle: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  coverSubtitle: {
    fontSize: 10,
    color: "#d1d5db",
    marginTop: 4,
  },
  coverMeta: {
    fontSize: 9,
    color: "#9ca3af",
    marginTop: 12,
  },

  // ── Sections ──
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: COLORS.gray900,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    paddingBottom: 4,
  },
  section: {
    marginBottom: 24,
  },

  // ── Metric Cards ──
  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metricCard: {
    backgroundColor: COLORS.gray100,
    borderRadius: 6,
    padding: 12,
    width: "30%",
    flexGrow: 1,
  },
  metricLabel: {
    fontSize: 8,
    color: COLORS.gray500,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: COLORS.gray900,
  },

  // ── Table ──
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 2,
  },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  tableCell: {
    fontSize: 9,
    color: COLORS.gray700,
    flex: 1,
  },
  tableCellBold: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: COLORS.gray900,
    flex: 1,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: COLORS.gray500,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    flex: 1,
  },

  // ── Health ──
  healthRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    gap: 8,
  },
  healthLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.gray900,
    width: 80,
  },
  healthMessage: {
    fontSize: 9,
    color: COLORS.gray500,
    flex: 1,
  },
  badge: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },

  // ── Category bar ──
  categoryRow: {
    marginBottom: 8,
  },
  categoryMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  categoryName: {
    fontSize: 9,
    color: COLORS.gray700,
  },
  categoryCount: {
    fontSize: 9,
    color: COLORS.gray500,
  },
  categoryBarBg: {
    height: 4,
    backgroundColor: COLORS.gray200,
    borderRadius: 2,
  },
  categoryBarFill: {
    height: 4,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },

  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 20,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color: COLORS.gray500,
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(0)}K`;
  return `₦${n.toFixed(0)}`;
}

function badgeStyle(status: string) {
  const s = status.toLowerCase();
  if (s === "healthy" || s === "good") {
    return { backgroundColor: COLORS.greenBg, color: COLORS.green };
  }
  if (s === "warning") {
    return { backgroundColor: COLORS.yellowBg, color: COLORS.yellow };
  }
  return { backgroundColor: COLORS.redBg, color: COLORS.red };
}

function stockColor(qty: number) {
  if (qty === 0) return COLORS.red;
  if (qty <= 3) return COLORS.yellow;
  return COLORS.gray700;
}

// ─── Document ─────────────────────────────────────────────────────────────────

export function DashboardReport({ data }: { data: DashboardReportData }) {
  const maxCategoryCount = data.categories.reduce(
    (m, c) => Math.max(m, c.productCount),
    0
  );

  return (
    <Document
      title="Cruze Commerce — Dashboard Report"
      author="Cruze Commerce"
      subject={`Dashboard Report — ${data.range}`}
    >
      <Page size="A4" style={styles.page}>
        {/* ── Cover Band ──────────────────────────────── */}
        <View style={styles.coverBand}>
          <Text style={styles.coverTitle}>Cruze Commerce</Text>
          <Text style={styles.coverSubtitle}>Dashboard Overview Report</Text>
          <Text style={styles.coverMeta}>
            Period: {data.range}{"  ·  "}Generated: {data.generatedAt}
          </Text>
        </View>

        {/* ── Key Metrics ─────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricGrid}>
            {[
              { label: "Total Revenue", value: formatCurrency(data.metrics.revenue) },
              { label: "Total Profit", value: formatCurrency(data.metrics.profit) },
              { label: "Total Orders", value: data.metrics.orders.toLocaleString() },
              { label: "Active Customers", value: data.metrics.activeCustomers.toLocaleString() },
              { label: "Active Products", value: data.metrics.products.toLocaleString() },
              { label: "Store Visits", value: data.metrics.storeVisits.toLocaleString() },
            ].map((m) => (
              <View key={m.label} style={styles.metricCard}>
                <Text style={styles.metricLabel}>{m.label}</Text>
                <Text style={styles.metricValue}>{m.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Business Health ─────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Health</Text>
          {data.health.map((item) => {
            const bs = badgeStyle(item.status);
            return (
              <View key={item.label} style={styles.healthRow}>
                <Text style={styles.healthLabel}>{item.label}</Text>
                <Text style={styles.healthMessage}>{item.message}</Text>
                <Text style={[styles.badge, { backgroundColor: bs.backgroundColor, color: bs.color }]}>
                  {item.status}
                </Text>
              </View>
            );
          })}
        </View>

        {/* ── Top Categories ──────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Categories</Text>
          {data.categories.map((cat) => {
            const pct = maxCategoryCount > 0
              ? (cat.productCount / maxCategoryCount) * 100
              : 0;
            return (
              <View key={cat.name} style={styles.categoryRow}>
                <View style={styles.categoryMeta}>
                  <Text style={styles.categoryName}>{cat.name}</Text>
                  <Text style={styles.categoryCount}>{cat.productCount} products</Text>
                </View>
                <View style={styles.categoryBarBg}>
                  <View style={[styles.categoryBarFill, { width: `${pct}%` }]} />
                </View>
              </View>
            );
          })}
        </View>

        {/* ── Footer ─────────────────────────────────── */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Cruze Commerce — Confidential</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>

      {/* ── Page 2: Low Stock + Recent Orders ───────── */}
      <Page size="A4" style={styles.page}>
        <View style={[styles.coverBand, { paddingVertical: 16 }]}>
          <Text style={[styles.coverSubtitle, { color: COLORS.white, fontSize: 12 }]}>
            Inventory & Orders
          </Text>
        </View>

        {/* ── Low Stock ──────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Low Stock Alerts</Text>
          {data.lowStock.length === 0 ? (
            <Text style={styles.tableCell}>All inventory levels are healthy.</Text>
          ) : (
            <>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Product</Text>
                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Variant</Text>
                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Qty Left</Text>
              </View>
              {data.lowStock.map((item, i) => (
                <View key={i} style={styles.tableRow}>
                  <Text style={[styles.tableCellBold, { flex: 2 }]}>{item.productName}</Text>
                  <Text style={[styles.tableCell, { flex: 2 }]}>{item.variantName}</Text>
                  <Text style={[styles.tableCell, { flex: 1, color: stockColor(item.quantity) }]}>
                    {item.quantity === 0 ? "Out of stock" : `${item.quantity} left`}
                  </Text>
                </View>
              ))}
            </>
          )}
        </View>

        {/* ── Recent Orders ──────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {data.recentOrders.length === 0 ? (
            <Text style={styles.tableCell}>No recent orders found.</Text>
          ) : (
            <>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>Order #</Text>
                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Customer</Text>
                <Text style={styles.tableHeaderCell}>Total</Text>
                <Text style={styles.tableHeaderCell}>Status</Text>
                <Text style={styles.tableHeaderCell}>Date</Text>
              </View>
              {data.recentOrders.map((o, i) => (
                <View key={i} style={styles.tableRow}>
                  <Text style={styles.tableCellBold}>{o.orderNumber}</Text>
                  <Text style={[styles.tableCell, { flex: 2 }]}>{o.customerName}</Text>
                  <Text style={styles.tableCell}>{formatCurrency(o.total)}</Text>
                  <Text style={styles.tableCell}>{o.status}</Text>
                  <Text style={styles.tableCell}>{o.date}</Text>
                </View>
              ))}
            </>
          )}
        </View>

        {/* ── Footer ─────────────────────────────────── */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Cruze Commerce — Confidential</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
