import type { _Class } from './appSlice';

export default (_class: _Class) => {
  return (
    <div style = {{margin: "50px"}}>
        <h3>{_class.name}</h3>
      <ul>
        {_class.students.map(std_id => (
            <li key={std_id}>{std_id}</li>
        ))}
      </ul>
    </div>
  );
}
