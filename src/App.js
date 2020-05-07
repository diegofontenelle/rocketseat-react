import React, { useState, useEffect } from "react";
import api from 'services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function fetchRepositories() {
    const response = await api.get('repositories');

    setRepositories([...response.data]);
  }

  useEffect(() => {
    fetchRepositories();
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Fox Face',
      url: 'fakeUrl',
      techs: ['Node.js', 'ReactJs']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}

            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
