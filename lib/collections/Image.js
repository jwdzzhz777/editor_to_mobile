Images = new FS.Collection('images',{
	stores: [
		new FS.Store.FileSystem("image"),
		new FS.Store.FileSystem("small", {
			beforeWrite: function(fileObj) {
				// We return an object, which will change the
				// filename extension and type for this store only.
				return {
					extension: 'png',
					type: 'image/png'
				};
			},
			transformWrite: function(fileObj, readStream, writeStream) {
				// Transform the image into a 10x10px thumbnail
				gm(readStream, fileObj.name()).resize(100).stream().pipe(writeStream);
			}
		})
    ],
    filter: {
		allow: {
			contentTypes: ['image/*'] //allow only images in this FS.Collection
		}
    }
});

Images.allow({
	'insert': function() {
		// add custom authentication code here
		return true;
	},
	'download': function() {
        return true;
    },
	'update': function() {
		// add custom authentication code here
		return true;
	},
	'remove': function() {
		return true;
	}
});
