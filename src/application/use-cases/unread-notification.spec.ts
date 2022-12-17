import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";

describe('Unread notification', () => {
    it('should be able to unread a notification', async () => {
        const inMemoryNotificationsRepository = new InMemoryNotificationRepository();
        const unreadNotification = new UnreadNotification(inMemoryNotificationsRepository);

        const notification = makeNotification({
            readAt: new Date()
        });

        await inMemoryNotificationsRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id
        })

        expect(inMemoryNotificationsRepository.notifications[0].readAt).toBeNull();
    });

    it('should not be able to unread a non existing notification', async () => {
        const inMemoryNotificationsRepository = new InMemoryNotificationRepository();
        const unreadNotification = new UnreadNotification(inMemoryNotificationsRepository);

        expect(() => {
            return unreadNotification.execute({
                notificationId: 'example-fail-id'
            });
        }).rejects.toThrow(NotificationNotFound);
    })
}) 