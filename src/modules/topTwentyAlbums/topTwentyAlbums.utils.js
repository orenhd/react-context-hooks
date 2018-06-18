export function mapToListAlbumEntries(albumEntries) {
    if (!albumEntries || !albumEntries.length) return [];
    
    return albumEntries.map((albumEntry) => {
        return {
            id: albumEntry.id.label,
            title: albumEntry['im:name'].label,
            artist: albumEntry['im:artist'].label,
            copyright: albumEntry['rights'].label,
            thumbnail: albumEntry['im:image'] && albumEntry['im:image'][0] ? albumEntry['im:image'][0].label : null,
        }
    });
} 