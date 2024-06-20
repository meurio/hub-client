ClassicEditor
	.create( document.querySelector( '.editor' ), {
		// Editor configuration.
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( handleSampleError );

function handleSampleError( error ) {
	const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

	const message = [
		'Oops, something went wrong!',
<<<<<<< HEAD
		`Please, report the following error on ${ issueUrl } with the build id "93okfd2y7ie6-b0yvsfceumgh" and the error stack trace:`
=======
		`Please, report the following error on ${ issueUrl } with the build id "kxlsmp5j63dq-wbhgbegb0n5t" and the error stack trace:`
>>>>>>> 63416bc39 (feat: add ckeditor to autofire)
	].join( '\n' );

	console.error( message );
	console.error( error );
}
