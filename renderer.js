window.onload = () => {


    document.getElementById('executar').addEventListener('click', async () => {
        const query = document.getElementById('query').value;
        const tabela = document.getElementById('tabela');

        try {
            const resultados = await window.executeSQL(query);

            // Clear the table
            tabela.innerHTML = '';

            if (resultados.length > 0) {
                // Create table headers
                const headerRow = document.createElement('tr');
                Object.keys(resultados[0]).forEach(coluna => {
                    const th = document.createElement('th');
                    th.textContent = coluna;
                    headerRow.appendChild(th);
                });
                tabela.appendChild(headerRow);

                // Create table rows
                resultados.forEach(linha => {
                    const row = document.createElement('tr');
                    Object.values(linha).forEach(valor => {
                        const td = document.createElement('td');
                        td.textContent = valor;
                        row.appendChild(td);
                    });
                    tabela.appendChild(row);
                });
            } else {
                // If no results, show a message
                const emptyRow = document.createElement('tr');
                const emptyCell = document.createElement('td');
                emptyCell.textContent = 'No results found';
                emptyCell.colSpan = 1;
                emptyRow.appendChild(emptyCell);
                tabela.appendChild(emptyRow);
            }
        } catch (error) {
            console.error('Error executing query:', error);
        }
    });

}