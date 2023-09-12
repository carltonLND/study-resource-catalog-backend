
INSERT INTO resource_tags (resource_id, tag_id)
VALUES
(1, 6),
(2, 5),
(3, 4),
(1, 4),
(5, 2),
(3, 5);

INSERT INTO recommendations
(resource_id, recommendation_type_id, content)
VALUES
(1, 1, 'i give this a 5/7.'),
(2, 2, 'this was a solid 5/7.'),
(3, 3, '5/7 would exactly describe what this deserves as a rating.'),
(4, 1, '5/7 simply because you could not find a single flaw in it.'),
(5, 2, 'absolutely flawless, 5/7.'),
(6, 3, 'could not have been more perfect 5/7.');

INSERT INTO likes (resource_id, user_id)
VALUES
(1, 1),
(2, 1),
(3, 4),
(4, 1),
(5, 5),
(6, 6),
(7, 1),
(8, 2),
(9, 5),
(10, 2),
(11, 4),
(12, 6),
(13, 6),
(14, 5),
(15, 5),
(16, 4),
(17, 4),
(18, 3),
(19, 3),
(20, 5),
(21, 1),
(22, 1),
(23, 1);

INSERT INTO comments
(user_id, resource_id, content)
VALUES
(1, 1, 'Wow, this video is amazing! I can''t believe how awesome it is!'),
(2, 2, 'This video is exactly what I needed. Thanks for sharing!'),
(3, 3, 'I can''t find a single flaw in this video. Perfect 5/7!'),
(4, 4, 'Absolutely flawless content. I give it a solid 5/7.'),
(5, 5, 'This video couldn''t have been more perfect. 5/7 from me.'),
(6, 6, 'I give this video a solid 5/7.'),
(7, 1, 'Wow, this video is amazing! I can''t believe how awesome it is!'),
(8, 2, 'This video is exactly what I needed. Thanks for sharing!'),
(9, 3, 'I can''t find a single flaw in this video. Perfect 5/7!'),
(10, 4, 'Absolutely flawless content. I give it a solid 5/7.'),
(11, 5, 'This video couldn''t have been more perfect. 5/7 from me.'),
(11, 6, 'This video could have been less perfect. 5/7 from me.');


INSERT INTO user_resources (resource_id, user_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6);