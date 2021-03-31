// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

if ('clipboard' in navigator) {
    let canWriteClipboard = false;
    navigator.permissions.query({ name: 'clipboard-read' }).then((perms) => {
        canWriteClipboard = perms.state;

        if (canWriteClipboard === "granted") {
            $("#copyToClipboard").on('click', () => { navigator.clipboard.writeText(window.location.href); })
        } else if (canWriteClipboard === "prompt") {
            $("#copyToClipboard").on('click', () => { $("#clipboardPerms").show(); })
        } else {
            return;
        }

        $("#copyToClipboard").removeAttr('hidden');
    });    
}


if ('caches' in window) {
    let offlineBtn = $('#saveForOffline');

    if (offlineBtn) {
        let isCached = false;

        offlineBtn.on('click', async () => {
            let cache = await caches.open('offline-job-posts')
                .then(async (cache) => {
                    let isNotCached = await cache.match(window.location.href);

                    let cacheMech = () => {
                        cache.add(window.location.href);
                    }

                    if (isNotCached) {
                        offlineBtn.val('Save for offline');
                        cacheMech = () => {
                            cache.delete(window.location.href);
                        }
                    } else {
                        offlineBtn.val('Remove from Cache');
                    }

                    cacheMech();
                })
        });

        (async function () {
            await caches.open('offline-job-posts')
                .then(async (cache) => {
                    cache.match(window.location.href).then((isNotCached) => {
                        if (isNotCached) {
                            offlineBtn.val('Remove from Cache');
                        } else {
                            offlineBtn.val('Save for offline');
                        }
                    });
                });
        })();
    }

    offlineBtn.removeAttr('hidden');
}
