document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3005/Cursos';
    const cursosTable = document.getElementById('cursosTable').getElementsByTagName('tbody')[0];
    const cursoForm = document.getElementById('cursoForm');
    const cursoIdInput = document.getElementById('cursoId');
    const nombreInput = document.getElementById('nombre');
    const descripcionInput = document.getElementById('descripcion');
    const creditosInput = document.getElementById('creditos');

    // Fetch cursos and display them
    function fetchCursos() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(cursos => {
                cursosTable.innerHTML = '';
                cursos.forEach(curso => {
                    const row = cursosTable.insertRow();
                    row.insertCell(0).textContent = curso.id;
                    row.insertCell(1).textContent = curso.nombre;
                    row.insertCell(2).textContent = curso.descripcion;
                    row.insertCell(3).textContent = curso.creditos;
                    const actionsCell = row.insertCell(4);
                    actionsCell.innerHTML = `
                        <button class="btn btn-warning btn-sm" onclick="editCurso(${curso.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCurso(${curso.id})">Eliminar</button>
                    `;
                });
            })
            .catch(error => console.error('Error fetching cursos:', error));
    }

    // Add or update curso
    cursoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = cursoIdInput.value;
        const nombre = nombreInput.value;
        const descripcion = descripcionInput.value;
        const creditos = creditosInput.value;

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiUrl}/${id}` : apiUrl;
        const data = { nombre, descripcion, creditos };

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(() => {
                fetchCursos();
                cursoForm.reset();
                cursoIdInput.value = '';
            })
            .catch(error => console.error('Error saving curso:', error));
    });

    // Edit curso
    window.editCurso = function(id) {
        fetch(`${apiUrl}/${id}`)
            .then(response => response.json())
            .then(curso => {
                nombreInput.value = curso.nombre;
                descripcionInput.value = curso.descripcion;
                creditosInput.value = curso.creditos;
                cursoIdInput.value = curso.id;
            })
            .catch(error => console.error('Error fetching curso:', error));
    };

    // Delete curso
    window.deleteCurso = function(id) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(() => fetchCursos())
            .catch(error => console.error('Error deleting curso:', error));
    };

    // Initial fetch
    fetchCursos();
});


