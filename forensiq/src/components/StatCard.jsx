function StatCard({ title, value, description, icon: Icon, color }) {

  return (

    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">

      <div className="flex justify-between items-start">

        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-3">
            {value}
          </h2>
        </div>

        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={23} />
        </div>

      </div>

      <p className="text-xs text-gray-500 mt-4">
        {description}
      </p>

    </div>

  );

}

export default StatCard;