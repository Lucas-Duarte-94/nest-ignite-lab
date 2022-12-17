import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { SendNotification } from "./send-notification"

describe('Send notification', () => {
    it('should be able to send a notification', async () => {
        const inMemoryNotificationsRepository = new InMemoryNotificationRepository();
        const sendNotification = new SendNotification(inMemoryNotificationsRepository);

        const { notification } = await sendNotification.execute({
            category: 'social',
            content: 'this is a notification example',
            recipientId: 'example-recipient-id'
        })

        expect(inMemoryNotificationsRepository.notifications).toHaveLength(1);
        expect(inMemoryNotificationsRepository.notifications[0]).toEqual(notification);
    })
})