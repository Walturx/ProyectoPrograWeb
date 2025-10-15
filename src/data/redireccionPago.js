import { useNavigate } from "react-router-dom";

export function useMetodoPagoHandler() {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const id = e.target.id;

    if (id === "qr-radio") {
      navigate("/pago-qr");
    } else if (id === "tarjeta-radio") {
      navigate("/pago-tarjeta");
    }
  };

  return { handleChange };
}
