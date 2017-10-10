export function removeAcentos(s) {
	let acento = 'ÀàÁáÂâÃãÉéÊêÍíÓóÔôÕõÚúÜüÇç';
	let normal = 'AaAaAaAaEeEeIiOoOoOoUuUucc';
	let ret = '';
	for (let i = 0; i < s.length; ++i) {
		let idxAcento = acento.indexOf(s.charAt(i));
		ret += (idxAcento !== -1) ? normal.charAt(idxAcento) : s.charAt(i);
	}
	return ret;
}
