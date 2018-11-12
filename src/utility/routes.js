import MainController from '../controllers/MainController';
import SignInController from '../controllers/SignInController';
import ChatController from '../controllers/ChatController';

const routes = {
    main: { key: "com.now.Main", controller: MainController, title: "Main"},
    signIn: { key: "com.now.SignIn", controller: SignInController, title: "Sign In!"},
    chat: { key: "com.now.Chat", controller: ChatController, title: "Chat"}

}
export default routes