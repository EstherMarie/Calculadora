const buttons = document.querySelectorAll('button');
let visor = document.querySelector('.visor');
visor.style.cssText = 'text-align: right;';

let historico = document.querySelector('.historico');

let primeiroValor;
let segundoValor;
let opr;

buttons.forEach((button) => {
	button.addEventListener('click', () => {
		function calculaResultado() {
			console.log(primeiroValor, opr, segundoValor);

			let divOperacao = document.createElement('div');
			divOperacao.classList.add('operacao');
			let divResultado = document.createElement('div');
			divResultado.classList.add('resultado');

			let resultado = parseFloat(calculo(primeiroValor, segundoValor, opr));

			if (calculo(primeiroValor, segundoValor, opr) == 'oh no!') {
				resultado = 'oh no!';
				divOperacao.textContent = '';
				divResultado.textContent = primeiroValor = segundoValor = opr = undefined;
				// visor.value = resultado = ''
			} else if (calculo(primeiroValor, segundoValor, opr) == 00000) {
				resultado = 00000;
				divOperacao.textContent = 'oh nonononono';
				divResultado.textContent = '';
				primeiroValor = segundoValor = opr = undefined;
				// visor.value = resultado = ''
			} else {
				if (Number.isInteger(resultado)) {
					resultado = calculo(primeiroValor, segundoValor, opr);
					document.querySelector('.ponto').disabled = false;
				} else if (Number.isInteger(resultado) == false) {
					resultado = parseFloat(
						calculo(primeiroValor, segundoValor, opr)
					).toFixed(1);
					document.querySelector('.ponto').disabled = true;
				}

				divOperacao.textContent = visor.value + ' = ';
				divResultado.textContent = resultado;
			}

			divOperacao.insertAdjacentElement('beforeend', divResultado);
			historico.insertAdjacentElement('afterbegin', divOperacao);
			segundoValor = opr = undefined;
			visor.value = primeiroValor = resultado;
		}

		if (button.value == 'C') {
			visor.value = '';
			primeiroValor = segundoValor = opr = undefined;
			document.querySelector('.ponto').disabled = false;
		} else if (button.classList.contains('ponto')) {
			visor.value += button.value;
			button.disabled = true;
		} else if (button.value == 'backspace') {
			visor.value.slice(-1) == '+' ||
			visor.value.slice(-1) == '-' ||
			visor.value.slice(-1) == '/' ||
			visor.value.slice(-1) == '*'
				? (visor.value = visor.value)
				: (visor.value = visor.value.slice(0, -1));
		} else if (button.classList.contains('operador')) {
			document.querySelector('.ponto').disabled == true
				? (document.querySelector('.ponto').disabled = false)
				: (document.querySelector('.ponto').disabled = false);

			visor.value == 'oh no!'
				? (visor.value = '' && primeiroValor == 0 && resultado == 0)
				: (visor.value = visor.value);

			if (opr == undefined) {
				primeiroValor = Number(visor.value);
				opr = button.value;
			} else if (opr != undefined) {
				// se possui algo a direita do opr => calculo()
				if (visor.value.slice(visor.value.lastIndexOf(opr) + 1) != '') {
					segundoValor = Number(
						visor.value.slice(visor.value.indexOf(opr) + 1)
					);
					calculaResultado();
					opr = button.value;
				}

				// sen??o trocar opr antigo pelo opr digitado
				else if (
					visor.value.slice(visor.value.lastIndexOf(opr) + 1) == false
				) {
					primeiroValor = Number(
						visor.value.slice(0, visor.value.lastIndexOf(opr))
					);
					visor.value[visor.value.lastIndexOf(opr)] = button.value;
					opr = button.value;
				}
			}
			visor.value = primeiroValor + opr;
			// console.log(visor.value, primeiroValor, opr);
		} else if (button.value == '=') {
			segundoValor = Number(visor.value.slice(visor.value.indexOf(opr) + 1));

			if (
				primeiroValor == undefined ||
				segundoValor == undefined ||
				opr == undefined
			) {
				console.log(primeiroValor, opr, segundoValor);
				visor.value = 'Opera????o inv??lida';
			} else if (primeiroValor != undefined && segundoValor != undefined) {
				calculaResultado();
			}
		} else {
			visor.value == 'oh no!'
				? (visor.value = '')
				: (visor.value = visor.value);
			visor.value += button.value;
		}
	});
});

function calculo(valor1, valor2, operando) {
	if (primeiroValor == 'oh no!') {
		return 00000;
	} else if (operando == '+') {
		return valor1 + valor2;
	} else if (operando == '-') {
		return valor1 - valor2;
	} else if (operando == '*') {
		return valor1 * valor2;
	} else if (operando == '/') {
		if (segundoValor == 0) {
			return 'oh no!';
		} else {
			return valor1 / valor2;
		}
	}
}

function limparHistorico() {
	historico.textContent = '';
}

// window.addEventListener('keydown', (e) => {
// 	// console.log(e.keyCode);

// 	// let keycode = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

// 	switch (e.keyCode) {
// 		case 48:
// 			key = '0';
// 			console.log(key);
// 			visor.value += key;
// 			break;
// 		case 49:
// 			key = '1';
// 			visor.value += key;
// 			break;
// 		case 50:
// 			key = '2';
// 			visor.value += key;
// 			break;
// 		case 51:
// 			key = '3';
// 			visor.value += key;
// 			break;
// 		case 52:
// 			key = '4';
// 			visor.value += key;
// 			break;
// 		case 53:
// 			key = '5';
// 			visor.value += key;
// 			break;
// 		case 54:
// 			key = '6';
// 			visor.value += key;
// 			break;
// 		case 55:
// 			key = '7';
// 			visor.value += key;
// 			break;
// 		case 56:
// 			key = '8';
// 			visor.value += key;
// 			break;
// 		case 57:
// 			key = '9';
// 			visor.value += key;
// 			break;
// 		case 173:
// 			key = '-';
// 			// console.log(key);
// 			visor.value += key;
// 			break;
// 		case 61:
// 			key = '+';
// 			// console.log(key);
// 			visor.value += key;
// 			break;
// 		case 16 && 56:
// 			key = '*';
// 			// console.log(key);
// 			visor.value += key;
// 			break;
// 		case 81:
// 			key = '/';
// 			// console.log(key);
// 			visor.value += key;
// 			break;
// 		case 13:
// 			key = '=';
// 			// console.log(key);
// 			let r1 = Function('"use strict";return (' + visor.value + ')')();

// 			let divOperacao = document.createElement('div');
// 			divOperacao.classList.add('operacao');
// 			let divResultado = document.createElement('div');
// 			divResultado.classList.add('resultado');

// 			divOperacao.textContent = visor.value + ' = ';
// 			divResultado.textContent = r1;

// 			divOperacao.insertAdjacentElement('beforeend', divResultado);
// 			historico.insertAdjacentElement('afterbegin', divOperacao);

// 			visor.value = r1;
// 			segundoValor = opr = undefined;
// 			break;
// 	}
// });

// Sobre o m??todo slice:
/*
O m??todo slice() extrai uma parte de uma string e a retorna como uma nova string, sem modificar a string original.
string.slice(indexInicio, indexFim)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
*/
