export const DefaultColumn = ({ cols = 1 }) => {
  return (
    <tr>
      {[...Array(cols)].map((_, index) => (
        <td key={index} className="py-2">
          <span className="text-gray-500 uppercase text-xs font-semibold italic ">
            No data
          </span>
        </td>
      ))}
    </tr>
  );
};
