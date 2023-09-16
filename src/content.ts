(function () {
	const body: HTMLBodyElement = document.querySelector(
		'body'
	) as HTMLBodyElement;

	const popUpString = `
    <div style="position: fixed; bottom: 0; transition: 400ms all linear ; background: black; color: white; font-size: 16px">
      <div style="">Hello i'm a popup</div>
      
    </div
`;

	const div = document.createElement('div');
	div.innerHTML = popUpString;
	body.appendChild(div);
})();
