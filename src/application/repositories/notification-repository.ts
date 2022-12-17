import { Notification } from "../entities/notification";

abstract class NotificationsRepository {
    abstract create(notification: Notification): Promise<void>;
    abstract findById(notficationId: string): Promise<Notification | null>;
    abstract save(notification: Notification): Promise<void>;
    abstract countManyByRecipientId(recipientId: string): Promise<number>;
    abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
}

export { NotificationsRepository };