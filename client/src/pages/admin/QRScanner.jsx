import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "react-toastify";
import axios from "axios";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);
  const hasScannedRef = useRef(false); 

  useEffect(() => {
    if (scannerRef.current) return;

    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      async (result) => {
        if (hasScannedRef.current) return; 
        hasScannedRef.current = true;

        setScanResult(result);

        try {
          const res = await axios.get(result, { withCredentials: true });
          toast.success(res.data.message || "Check-in successful!");
        } catch (error) {
          const msg =
            error?.response?.data?.message || "Check-in failed. Try again.";
          toast.error(msg);
        }

        // Clear scanner and stop camera
        scanner.clear().then(() => {
          document.getElementById("qr-reader").innerHTML = "";
        });
      },
      (err) => {
        console.warn("QR scan error:", err);
      }
    );

    scannerRef.current = scanner;
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Scan QR to Check In</h2>
      <div id="qr-reader" className="w-[300px]" />
      {scanResult && (
        <p className="text-sm text-gray-500 break-all">
          Scanned URL: {scanResult}
        </p>
      )}
    </div>
  );
};

export default QRScanner;