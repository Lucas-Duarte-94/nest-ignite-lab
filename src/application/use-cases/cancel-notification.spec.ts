import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Cancel notification', () => {
    it('should be able to cancel a notification', async () => {
        const inMemoryNotificationsRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(inMemoryNotificationsRepository);

        const notification = new Notification({
            category: 'social',
            content: new Content('Test content'),
            recipientId: 'example-recipient-id',
        })

        await inMemoryNotificationsRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id
        })

        expect(inMemoryNotificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });

    it('should not be able to cancel a non existing notification', async () => {
        const inMemoryNotificationsRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(inMemoryNotificationsRepository);



        expect(() => {
            return cancelNotification.execute({
                notificationId: 'example-fail-id'
            });
        }).rejects.toThrow(NotificationNotFound);
    })
}) 