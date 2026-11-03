function IncidentTable() {

  const incidents = [
    {
      id: "FR-1024",
      location: "Zone A - North Forest",
      area: "4.2 hectares",
      date: "03 Nov 2026",
      risk: "High"
    },
    {
      id: "FR-1025",
      location: "Zone B - Eastern Range",
      area: "2.1 hectares",
      date: "02 Nov 2026",
      risk: "Medium"
    },
    {
      id: "FR-1026",
      location: "Zone C - Western Range",
      area: "1.5 hectares",
      date: "01 Nov 2026",
      risk: "Low"
    }
  ];

  return (

    <div className="bg-white rounded-xl border border-gray-200 mt-6">

      <div className="p-5 border-b border-gray-200 flex justify-between">

        <h2 className="font-semibold text-gray-800">
          Recent Forest Incidents
        </h2>

        <button className="text-sm text-green-700 font-medium">
          View All
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm text-left">

          <thead className="bg-gray-50 text-gray-500">

            <tr>
              <th className="p-4">Incident ID</th>
              <th className="p-4">Location</th>
              <th className="p-4">Affected Area</th>
              <th className="p-4">Date</th>
              <th className="p-4">Risk Level</th>
            </tr>

          </thead>

          <tbody>

            {incidents.map((item) => (

              <tr key={item.id} className="border-t border-gray-100">

                <td className="p-4 font-medium">{item.id}</td>

                <td className="p-4">{item.location}</td>

                <td className="p-4">{item.area}</td>

                <td className="p-4">{item.date}</td>

                <td className="p-4">

                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.risk === "High"
                      ? "bg-red-100 text-red-700"
                      : item.risk === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {item.risk}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default IncidentTable;