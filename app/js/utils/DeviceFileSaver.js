import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';

module.exports = {
  DownloadFile(URL, Folder_Name, File_Name) {
    if (URL == null && Folder_Name == null && File_Name == null) {
      return;
    } else {
      this.download(URL, Folder_Name, File_Name);
    }
  },

  download(URL, Folder_Name, File_Name) {
    // Request the file system
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
    function fileSystemSuccess(fileSystem) {
      let download_link = encodeURI(URL);
      let directoryEntry = fileSystem.root; // For root path of directory
      directoryEntry.getDirectory(Folder_Name, {create: true, exclusive: false}, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
      let rootdir = fileSystem.root;
      let fp = rootdir.toURL();  // Gives Fullpath of local directory
      fp = fp + '/' + Folder_Name + '/' + File_Name + '.png'; // fullpath and name of the file which we want to give
      // Function call to download
      filetransfer(download_link, fp);
    }
    function onDirectorySuccess(parent) {
      // Directory successfuly created
    }
    function onDirectoryFail(error) {
      // On error
      alert('Unable to create new directory: ' + error.code);
    }
    function fileSystemFail(evt) {
      //Unable to access file system
      alert(evt.target.error.code);
    }

    function filetransfer(download_link, fp) {
      let fileTransfer = new FileTransfer();
      // Local path and File download function with URL
      fileTransfer.download(download_link, fp,
      function(entry) {
        AppDispatcher.dispatch({
          type: ActionTypes.SAVE_DIRMAP,
          name: entry.name,
          dirMap: entry.nativeURL
        });
      },
      function(error) {
        // Failed errors
        console.log('download error source ' + error.source);
      }
      );
    }
  },

  deleteFile(url) {
    window.resolveLocalFileSystemURI('file:///example.txt', onResolveSuccess, fail);

    function onResolveSuccess(fileEntry) {
      fileEntry.remove(function(file) {
          console.log('File removed!');
        },function() {
          console.log('error deleting the file ' + error.code);
        });
    }

    function fail(error) {
      console.log(error.code);
    }
  }
};

