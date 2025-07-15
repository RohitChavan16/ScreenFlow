import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "react-toastify";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (scannerRef.current) return; // Avoid multiple renders

    scannerRef.current = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scannerRef.current.render(
      async (decodedText, decodedResult) => {
        try {
          const url = new URL(decodedText);
          const bookingId = url.pathname.split("/").pop(); // /check-in/:bookingId
          const token = url.searchParams.get("token");

          if (!bookingId || !token) {
            toast.error("Invalid QR code data.");
            return;
          }

          const res = await fetch(`/check-in/${bookingId}?token=${token}`);
          const text = await res.text();

          setScanResult(text);
          toast.success(text);
          scannerRef.current.clear(); // Stop scanning after success
        } catch (err) {
          console.error("Scan error:", err);
          toast.error("Invalid or broken QR code.");
        }
      },
      (error) => {
        console.warn("QR scan error:", error);
      }
    );

    return () => {
      scannerRef.current.clear().catch((err) => console.error("Clear error", err));
    };
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">🎥 Scan Booking QR</h2>
      <div id="qr-reader" className="mx-auto max-w-md"></div>

      {scanResult && (
        <p className="mt-4 text-green-600 font-medium">{scanResult}</p>
      )}
    </div>
  );
};

export default QRScanner;