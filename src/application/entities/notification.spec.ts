import { Content } from "./content";
import { Notification } from "./notification";

describe('notification', () => {
    it('should be able to create a notification', () => {
        const notification = new Notification({
            content: new Content('Você recebeu uma solicitação de amizade.'),
            category: 'social',
            recipientId: 'example-recipient-id'
        })

        expect(notification).toBeTruthy();
    })

    // it('should not be able to create a notification content with less than 5 characters', () => {
    //     expect(() => new Content('aaa')).toThrow();
    // })

    // it('should not be able to create a notification content with more than 240 characters', () => {
    //     expect(() => new Content('a'.repeat(241))).toThrow();
    // })
})