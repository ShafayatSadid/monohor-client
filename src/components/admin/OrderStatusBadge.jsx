// components/admin/OrderStatusBadge.jsx
const STATUS_MAP = {
    pending: { label: "পেন্ডিং", cls: "bg-warning/15 text-warning border-warning/30" },
    confirmed: { label: "কনফার্মড", cls: "bg-info/15 text-info border-info/30" },
    processing: { label: "প্রসেসিং", cls: "bg-info/15 text-info border-info/30" },
    shipped: { label: "শিপড", cls: "bg-primary/15 text-primary border-primary/30" },
    delivered: { label: "ডেলিভারড", cls: "bg-success/15 text-success border-success/30" },
    cancelled: { label: "বাতিল", cls: "bg-error/15 text-error border-error/30" },
};

const PAYMENT_MAP = {
    unpaid: { label: "অপরিশোধিত", cls: "bg-warning/15 text-warning border-warning/30" },
    "cod-pending": { label: "COD বাকি", cls: "bg-warning/15 text-warning border-warning/30" },
    paid: { label: "পরিশোধিত", cls: "bg-success/15 text-success border-success/30" },
    failed: { label: "ব্যর্থ", cls: "bg-error/15 text-error border-error/30" },
};

export const OrderStatusBadge = ({ status }) => {
    const s = STATUS_MAP[status] || {
        label: status,
        cls: "bg-border text-foreground border-border",
    };
    return (
        <span
            className={`inline-block font-body text-[11px] font-semibold px-2.5 py-1 rounded-full border ${s.cls}`}
        >
            {s.label}
        </span>
    );
};

export const PaymentStatusBadge = ({ status }) => {
    const s = PAYMENT_MAP[status] || {
        label: status,
        cls: "bg-border text-foreground border-border",
    };
    return (
        <span
            className={`inline-block font-body text-[11px] font-semibold px-2.5 py-1 rounded-full border ${s.cls}`}
        >
            {s.label}
        </span>
    );
};

export const ORDER_STATUSES = [
    { value: "", label: "সব" },
    { value: "pending", label: "পেন্ডিং" },
    { value: "confirmed", label: "কনফার্মড" },
    { value: "processing", label: "প্রসেসিং" },
    { value: "shipped", label: "শিপড" },
    { value: "delivered", label: "ডেলিভারড" },
    { value: "cancelled", label: "বাতিল" },
];

export default OrderStatusBadge;