import { defineStore } from 'pinia';
import { ref } from 'vue';

const notificationStore = defineStore('notification', () => {
    const textMess = ref('');
    const title = ref('');
    const urlImg = ref('');
    const openDialog = ref(false);


    const mess = (text) => {
        textMess.value = text;
    };

    const titleMessage = (newTitle) => {
        title.value = newTitle;
    };
    const imageMessage = (url) => {
        urlImg.value = url;
    };
    const dialog = (a: boolean) => {
        openDialog.value = a;
    }
    return { textMess, title, mess, titleMessage, openDialog,urlImg, dialog,imageMessage };
});

export default notificationStore;
