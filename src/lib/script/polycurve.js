/**
 * Function to find the coefficients of a polynomial curve using polynomial regression.
 *
 * @param {number[]} xCoordinates - Array of x-coordinates of the input points.
 * @param {number[]} yCoordinates - Array of y-coordinates of the input points.
 * @returns {number[]} Array of coefficients of the polynomial curve.
 * @throws {Error} Throws an error if the number of input coordinates is not equal to DEGREE.
 */
function polynomialRegression(xCoordinates, yCoordinates,DEGREE=5) {
    const n = xCoordinates.length;
    const degree = n - 1;
    if (xCoordinates.length !== DEGREE || yCoordinates.length !== DEGREE) {
        const err = "Number of input coordinates should be equal to "+ DEGREE
        throw new Error(err);
    }
    // Create the Vandermonde matrix
    const vandermondeMatrix = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j <= degree; j++) {
            row.push(Math.pow(xCoordinates[i], j));
        }
        vandermondeMatrix.push(row);
    }

    // Create the y matrix
    const yMatrix = [];
    for (let i = 0; i < n; i++) {
        yMatrix.push([yCoordinates[i]]);
    }

    // Solve the system of equations using matrix operations
    const vandermondeMatrixTranspose = transposeMatrix(vandermondeMatrix);
    const vandermondeMatrixProduct = multiplyMatrices(vandermondeMatrixTranspose, vandermondeMatrix);
    const vandermondeMatrixInverse = inverseMatrix(vandermondeMatrixProduct);
    const coefficientsMatrix = multiplyMatrices(multiplyMatrices(vandermondeMatrixInverse, vandermondeMatrixTranspose), yMatrix);

    // Extract the coefficients from the matrix
    const coefficients = [];
    for (let i = 0; i <= degree; i++) {
        coefficients.push(coefficientsMatrix[i][0]);
    }

    return coefficients;
}

/**
 * Function to transpose a matrix.
 *
 * @param {number[][]} matrix - The matrix to be transposed.
 * @returns {number[][]} The transposed matrix.
 */
function transposeMatrix(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

/**
 * Function to multiply two matrices.
 *
 * @param {number[][]} matrix1 - The first matrix.
 * @param {number[][]} matrix2 - The second matrix.
 * @returns {number[][]} The product of the two matrices.
 */
function multiplyMatrices(matrix1, matrix2) {
    const result = [];
    const m = matrix1.length;
    const n = matrix2[0].length;
    const p = matrix2.length;

    for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            let sum = 0;
            for (let k = 0; k < p; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }
            row.push(sum);
        }
        result.push(row);
    }

    return result;
}

/**
 * Function to calculate the inverse of a matrix.
 *
 * @param {number[][]} matrix - The matrix to be inverted.
 * @returns {number[][]} The inverted matrix.
 */
function inverseMatrix(matrix) {
    const n = matrix.length;
    const identityMatrix = createIdentityMatrix(n);
    const augmentedMatrix = matrix.map((row, rowIndex) => [...row, ...identityMatrix[rowIndex]]);

    for (let i = 0; i < n; i++) {
        const pivot = augmentedMatrix[i][i];

        for (let j = 0; j < 2 * n; j++) {
            augmentedMatrix[i][j] /= pivot;
        }

        for (let k = 0; k < n; k++) {
            if (k !== i) {
                const factor = augmentedMatrix[k][i];

                for (let j = 0; j < 2 * n; j++) {
                    augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
                }
            }
        }
    }

    return augmentedMatrix.map(row => row.slice(n));
}

/**
 * Function to create an identity matrix of a given size.
 *
 * @param {number} size - The size of the identity matrix.
 * @returns {number[][]} The identity matrix.
 */
function createIdentityMatrix(size) {
    const matrix = [];

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(i === j ? 1 : 0);
        }
        matrix.push(row);
    }

    return matrix;
}

/**
* Function to evaluate a polynomial for a given value of x.
*
* @param {number[]} coefficients - Array of coefficients of the polynomial.
* @param {number} x - The value for which the polynomial should be evaluated.
* @returns {number} The result of the polynomial evaluation.
*/
function evaluatePolynomial(coefficients, x) {
    let result = 0;
    const n = coefficients.length;

    for (let i = 0; i < n; i++) {
        result += coefficients[i] * Math.pow(x, i);
    }

    return result;
}

/**
 * Function to perform Polynomial Curve Fitting and create a graph on a canvas.
 *
 * @param {number[]} xCoordinates - Array of x-coordinates of the input points.
 * @param {number[]} yCoordinates - Array of y-coordinates of the input points.
 * @param {number} curveResolution - Resolution of the curve (number of points to plot).
 */
function polynomialCurveFitting(xCoordinates, yCoordinates, curveResolution,DEGREE=5) {

    // Find the coefficients of the polynomial curve using polynomial regression
    const coefficients = polynomialRegression(xCoordinates, yCoordinates,DEGREE);

    // Plot the polynomial curve
    const curve = getCurve(coefficients, xCoordinates, curveResolution);

    return curve
}

/**
 * Function to plot the polynomial curve on the canvas.
 *
 * @param {number[]} coefficients - Array of coefficients of the polynomial curve.
 * @param {number[]} xCoordinates - Array of x-coordinates of the input points.
 * @param {number} curveResolution - Resolution of the curve (number of points to plot).
 */
function getCurve(coefficients, xCoordinates, curveResolution) {

    const minX = Math.min(...xCoordinates);
    const maxX = Math.max(...xCoordinates);
    const step = (maxX - minX) / curveResolution;
    const curve = []
    

    for (let x = minX; x <= maxX; x += step) {
        const y = evaluatePolynomial(coefficients, x);
        const xc = x
        curve.push([x,y])
    }

    return curve
}


const polycurve = {
    evaluatePolynomial,
    polynomialRegression,
    polynomialCurveFitting
}

export default  polycurve