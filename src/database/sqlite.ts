import db from './database';

export const insertQuery = (
    params = [],
    data: Array<object>,
    tblName: string,
) =>
    new Promise((resolve, reject) => {
        // if (data.length === 0) resolve();
        const keys = Object.keys(data[0]);
        let query = `INSERT INTO ${tblName} (${keys.join(', ')}) VALUES`;
        for (let i = 0; i < data.length; ++i) {
            const values = Object.values(data[i]);
            query = query + `(${values.map((el) => `'${el}'`).join(', ')})`;
            if (i != data.length - 1) {
                query = query + ',';
            }
        }
        const deleteQuery = `DELETE FROM ${tblName}`;
        query = query + ';';

        db.transaction((trans) => {
            trans.executeSql(
                deleteQuery,
                [],
                (trans, results) => {
                    trans.executeSql(
                        query,
                        params,
                        (trans, results) => {
                            resolve(results);
                        },
                        (error) => {
                            reject(error);
                        },
                    );
                },
                (error) => {
                    reject(error);
                },
            );
        });
    });
export const insertData = (
    params = [],
    data: Array<object>,
    tblName: string,
) =>
    new Promise<void>((resolve, reject) => {
        if (data.length === 0) resolve();

        const keys = Object.keys(data[0]);
        let query = `INSERT INTO ${tblName} (${keys.join(', ')}) VALUES`;
        for (let i = 0; i < data.length; ++i) {
            const values = Object.values(data[i]);
            query = query + `(${values.map((el) => `'${el}'`).join(', ')})`;
            if (i !== data.length - 1) {
                query = query + ',';
            }
        }
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tblName} (
          ${keys.map((key) => `${key} TEXT`).join(', ')}
        );
      `;
        db.transaction((trans) => {
            trans.executeSql(
                createTableQuery,
                [],
                () => {
                    trans.executeSql(
                        query,
                        params,
                        (trans, results) => {
                            resolve(results);
                        },
                        (error) => {
                            reject(error);
                        },
                    );
                },
                (error) => {
                    reject(error);
                },
            );
        });
    });
export const createTable = (
    columns: string[],
    tblName: string,
    foreignKeys: Array<{ column: string, referenceTable: string, referenceColumn: string }> = []
): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!columns || columns.length === 0) return resolve();

        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tblName} (
          ${columns.map((col) => `${col} TEXT`).join(', ')}
          ${foreignKeys.map(
            (fk) => `, FOREIGN KEY(${fk.column}) REFERENCES ${fk.referenceTable}(${fk.referenceColumn})`
        ).join('')}
        );`;

        db.transaction((trans) => {
            trans.executeSql(
                createTableQuery,
                [],
                () => {
                    console.log(`Table "${tblName}" created successfully`);
                    resolve();
                },
                (error) => {
                    console.error('Error executing SQL:', error);
                    reject(error);
                }
            );
        });
    });
};
export const selectQuery = (sql: string, params = []) =>
    new Promise((resolve, reject) => {
        db.transaction((trans) => {
            trans.executeSql(
                sql,
                params,
                (trans, results) => {
                    resolve(results);
                },
                (error) => {
                    reject(error);
                },
            );
        });
    });

export const deleteAllQuery = (sql: string, params = []) =>
    new Promise((resolve, reject) => {
        db.transaction((trans) => {
            trans.executeSql(
                sql,
                params,
                (trans, results) => {
                    resolve(results);
                },
                (error) => {
                    reject(error);
                },
            );
        });
    });

export const deleteWithIdsQuery = (
    params: Array<number> = [],
    tblName: string,
    field: string = 'id',
) =>
    new Promise((resolve, reject) => {
        db.transaction((trans) => {
            let placeholder = Array(params.length).fill('?').join(',');
            let sql = `DELETE FROM ${tblName} WHERE ${field} IN (${placeholder})`;
            console.log(sql);

            trans.executeSql(
                sql,
                params,
                (trans, results) => {
                    resolve(results);
                },
                (error) => {
                    reject(error);
                },
            );
        });
    });
