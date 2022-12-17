import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notification";

describe('Read notification', () => {
    it('should be able to read a notification', async () => {
        const inMemoryNotificationsRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(inMemoryNotificationsRepository);

        const notification = makeNotification();

        await inMemoryNotificationsRepository.create(notification);

        await readNotification.execute({
            notificationId: notification.id
        })

        expect(inMemoryNotificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
    });

    it('should not be able to read a non existing notification', async () => {
        const inMemoryNotificationsRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(inMemoryNotificationsRepository);

        expect(() => {
            return readNotification.execute({
                notificationId: 'example-fail-id'
            });
        }).rejects.toThrow(NotificationNotFound);
    })
}) 