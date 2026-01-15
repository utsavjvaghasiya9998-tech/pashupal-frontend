import Loader from "./Loader";

export const CommonTable = ({
    columns = [],
    data = [],
    loading = false,
    actions = null,
    emptyMessage = "No data found",
}) => {
    if (loading) {
        return <Loader text="Loading animal details..." />;
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
                {/* ===== HEADER ===== */}
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className="text-left px-4 py-3"
                            >
                                {col.header}
                            </th>
                        ))}
                        {actions && (
                            <th className="text-center px-4 py-3">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>

                {/* ===== BODY ===== */}
                <tbody>
                    {data.length === 0 && (
                        <tr>
                            <td
                                colSpan={columns.length + (actions ? 1 : 0)}
                                className="text-center py-6 text-gray-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}

                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-t hover:bg-gray-50 transition"
                        >
                            {columns.map((col, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`px-4 py-3 ${col.bold
                                            ? "font-medium text-gray-800"
                                            : "text-gray-600"
                                        }`}
                                >
                                    {col.render
                                        ? col.render(row)
                                        : row[col.accessor] || "-"}
                                </td>
                            ))}

                            {actions && (
                                <td className="px-4 py-3 text-center space-x-2">
                                    {actions(row)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


