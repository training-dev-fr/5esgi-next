import Message from "@/models/Message";
import Conversation from "@/models/Conversation";

type Props = {
    params: Promise<{
        conversationId: string;
    }>;
}
export default async function ConversationPage({params}: Props){
    const {conversationId} = await params;
    console.log(conversationId);

    const conversation = await Conversation.findOne({
        where: {
            id: conversationId
        },
        include:[{
            model: Message
        }]
    });
}