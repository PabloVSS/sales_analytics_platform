import { api } from "../../api/axios";

interface ExportButtonProps {
  endpoint: string;
  filename: string;
}

export function ExportButton({ endpoint, filename }: ExportButtonProps) {
  const handleExport = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(endpoint, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao exportar", error);
      alert("Falha ao exportar dados.");
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Exportar CSV
    </button>
  );
}