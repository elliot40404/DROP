// document.body.addEventListener('wheel', (e) => {
//     document.getElementById('nav').style.background = "rgba(0, 0, 0, 0.8)";
// });

FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileEncode);
// FilePond.registerPlugin(FilePondPluginImagePreview);
FilePond.parse(document.body);
// FilePond.setOptions({
//     server: '/'
// });