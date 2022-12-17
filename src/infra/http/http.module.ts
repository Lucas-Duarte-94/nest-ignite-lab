import { Module } from "@nestjs/common";
import { SendNotification } from "@application/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";
import { CancelNotification } from "@application/use-cases/cancel-notification";
import { ReadNotification } from "@application/use-cases/read-notification";
import { UnreadNotification } from "@application/use-cases/unread-notification";
import { GetRecipientNotification } from "@application/use-cases/get-recipient-notifications";
import { CountRecipientNotification } from "@application/use-cases/count-recipient-notifications";


@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [
        SendNotification,
        CancelNotification,
        ReadNotification,
        UnreadNotification,
        GetRecipientNotification,
        CountRecipientNotification
    ]
})
export class HttpModule { };