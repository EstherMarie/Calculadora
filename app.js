const buttons = document.querySelectorAll('button');
let visor = document.querySelector('.visor');
visor.style.cssText = 'text-align: right;';


let historico = document.querySelector('.historico')

let primeiroValor;
let segundoValor;
let opr;

window.addEventListener('keydown', (e) => {
	// console.log(e.keyCode);

	// let keycode = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

	switch (e.keyCode) {
		case 48:
			key = '0';
			console.log(key);
			visor.value += key;
			break;
		case 49:
			key = '1';
			visor.value += key;
			break;
		case 50:
			key = '2';
			visor.value += key;
			break;
		case 51:
			key = '3';
			visor.value += key;
			break;
		case 52:
			key = '4';
			visor.value += key;
			break;
		case 53:
			key = '5';
			visor.value += key;
			break;
		case 54:
			key = '6';
			visor.value += key;
			break;
		case 55:
			key = '7';
			visor.value += key;
			break;
		case 56:
			key = '8';
			visor.value += key;
			break;
		case 57:
			key = '9';
			visor.value += key;
			break;
		case 173:
			key = '-';
			// console.log(key);
			visor.value += key;
			break;
		case 61:
			key = '+';
			// console.log(key);
			visor.value += key;
			break;
		case 16 && 56:
			key = '*';
			// console.log(key);
			visor.value += key;
			break;
		case 81:
			key = '/';
			// console.log(key);
			visor.value += key;
			break;
		case 13:
			key = '=';
			// console.log(key);
			visor.value = Function('"use strict";return (' + visor.value + ')')();
			segundoValor = undefined;
			opr = undefined;
			break;
	}
});

buttons.forEach((button) => {
	button.addEventListener('click', () => {
		if (button.value == 'C') {
			visor.value = '';
			primeiroValor = segundoValor = opr = undefined;
		} else if (button.classList.contains('operador')) {
			if (segundoValor == undefined) {
				if (opr == undefined) {
					primeiroValor = Number(visor.value);
					opr = button.value;
				} else if (opr != undefined) {
					primeiroValor = Number(visor.value.slice(0, visor.value.lastIndexOf(opr)));
					visor.value[visor.value.lastIndexOf(opr)] = button.value;
					opr = button.value;
				}
			} if (primeiroValor && segundoValor && opr != undefined) {
				visor.value = primeiroValor = calculo(primeiroValor,segundoValor,opr);
				segundoValor = opr = undefined;
			} 

			visor.value = primeiroValor + opr;
			console.log(visor.value, primeiroValor, opr);
		} else if (button.value == '=') {
			segundoValor = Number(visor.value.slice(visor.value.indexOf(opr) + 1));
			console.log(segundoValor);

			
			if (primeiroValor && segundoValor != undefined) {
				let resultado = calculo(primeiroValor,segundoValor,opr);

				let divResultado = document.createElement('div')
				divResultado.classList.add('resultado')

				divResultado.textContent = visor.value + ' = ' + resultado
				historico.insertAdjacentElement('afterend', divResultado)
				visor.value = primeiroValor = resultado
				segundoValor = opr = undefined;
			} else {
				visor.value = 'Operação inválida';
			}
		} else {
			visor.value += button.value;
		}
	});
});

function calculo(valor1, valor2, operando) {
	if (operando == '+') {
		return valor1 + valor2;
	} else if (operando == '-') {
		return valor1 - valor2;
	} else if (operando == '*') {
		return valor1 * valor2;
	} else if (operando == '/') {
		return valor1 / valor2;
	}
}

// Sobre o método slice:
/*
O método slice() extrai uma parte de uma string e a retorna como uma nova string, sem modificar a string original.
string.slice(indexInicio, indexFim)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
*/
