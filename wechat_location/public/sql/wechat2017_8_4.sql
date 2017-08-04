-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-08-04 14:24:39
-- 服务器版本： 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wechat`
--

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`uid` int(11) NOT NULL,
  `uname` varchar(20) NOT NULL,
  `account` varchar(30) NOT NULL,
  `upwd` varchar(20) NOT NULL,
  `upic` varchar(100) NOT NULL,
  `msgNumber` int(11) NOT NULL COMMENT '保存该用户的聊天记录总数'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`uid`, `uname`, `account`, `upwd`, `upic`, `msgNumber`) VALUES
(1, '邬昊翔', 'wuhaoxiangfau', '123456', 'img/urs_pic.png', 25),
(2, 'rot', 'wecat_rot', '123456', 'img/user_01.jpg', 22),
(3, 'rot2', 'wecat_rot2', '123456', 'img/Koala.jpg', 1),
(4, 'rot3', 'wechat_rot3', '123456', 'img/Penguins.jpg', 0);

-- --------------------------------------------------------

--
-- 表的结构 `wecat_rot`
--

CREATE TABLE IF NOT EXISTS `wecat_rot` (
`mid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `faccount` varchar(30) NOT NULL,
  `msg` varchar(200) NOT NULL,
  `fmsg` varchar(200) NOT NULL,
  `subtime` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `wecat_rot`
--

INSERT INTO `wecat_rot` (`mid`, `uid`, `fid`, `fname`, `faccount`, `msg`, `fmsg`, `subtime`) VALUES
(10, 2, 1, '邬昊翔', 'wuhaoxiangfau', '', '666', '2017-07-31 13:29:15'),
(20, 2, 1, '邬昊翔', 'wuhaoxiangfau', 'good moring', '', '2017-07-31 15:37:34'),
(83, 2, 1, '邬昊翔', 'wuhaoxiangfau', '哈咯', '', '2017-08-02 12:20:45'),
(84, 2, 1, '邬昊翔', 'wuhaoxiangfau', 'hi', '', '2017-08-02 12:27:25'),
(85, 2, 1, '邬昊翔', 'wuhaoxiangfau', '你好啊', '', '2017-08-02 14:13:20'),
(86, 2, 1, '邬昊翔', 'wuhaoxiangfau', '这是一句超过6个字符的话', '', '2017-08-02 14:15:29'),
(87, 2, 1, '邬昊翔', 'wuhaoxiangfau', '这句话5字', '', '2017-08-02 17:13:07'),
(88, 2, 1, '邬昊翔', 'wuhaoxiangfau', '现在的时间是17:46', '', '2017-08-02 17:46:48'),
(89, 2, 1, '邬昊翔', 'wuhaoxiangfau', '现在的时间是17:46', '', '2017-08-02 17:47:03'),
(90, 2, 1, '邬昊翔', 'wuhaoxiangfau', '现在是17:57\n', '', '2017-08-02 17:57:16'),
(91, 2, 1, '邬昊翔', 'wuhaoxiangfau', '这是我发的一条信息', '', '2017-08-02 19:32:44'),
(92, 2, 1, '邬昊翔', 'wuhaoxiangfau', '', '我是rot，我现在给你发了一条数据', '2017-08-02 19:44:26'),
(93, 2, 1, '邬昊翔', 'wuhaoxiangfau', '', '这是我给你发的第二条数据', '2017-08-02 19:53:38'),
(94, 2, 1, '邬昊翔', 'wuhaoxiangfau', '', '你是傻逼吗', '2017-08-02 20:20:54'),
(95, 2, 1, '邬昊翔', 'wuhaoxiangfau', '你好', '', '2017-08-04 10:29:12'),
(96, 2, 1, '邬昊翔', 'wuhaoxiangfau', 'halo', '', '2017-08-04 10:30:51'),
(97, 2, 1, '邬昊翔', 'wuhaoxiangfau', '666', '', '2017-08-04 10:32:46'),
(98, 2, 1, '邬昊翔', 'wuhaoxiangfau', '666', '', '2017-08-04 10:33:36'),
(99, 2, 1, '邬昊翔', 'wuhaoxiangfau', '你好', '', '2017-08-04 10:39:00'),
(100, 2, 1, '邬昊翔', 'wuhaoxiangfau', '哈哈哈', '', '2017-08-04 10:42:50'),
(101, 2, 1, '邬昊翔', 'wuhaoxiangfau', '', '哈什么', '2017-08-04 10:45:26'),
(102, 2, 1, '邬昊翔', 'wuhaoxiangfau', '', '哈什么', '2017-08-04 11:33:02');

-- --------------------------------------------------------

--
-- 表的结构 `wecat_rot2`
--

CREATE TABLE IF NOT EXISTS `wecat_rot2` (
`mid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `fname` varchar(20) CHARACTER SET utf8 NOT NULL,
  `faccount` varchar(30) CHARACTER SET utf8 NOT NULL,
  `msg` varchar(200) CHARACTER SET utf8 NOT NULL,
  `fmsg` varchar(200) CHARACTER SET utf8 NOT NULL,
  `subtime` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `wecat_rot2`
--

INSERT INTO `wecat_rot2` (`mid`, `uid`, `fid`, `fname`, `faccount`, `msg`, `fmsg`, `subtime`) VALUES
(2, 3, 1, '邬昊翔', 'wuhaoxiangfau', '', '', '2017-08-01 08:00:00'),
(3, 3, 1, '邬昊翔', 'wuhaoxiangfau', '你好，这是我们第一句话', '', '2017-08-02 18:20:41');

-- --------------------------------------------------------

--
-- 表的结构 `wuhaoxiangfau`
--

CREATE TABLE IF NOT EXISTS `wuhaoxiangfau` (
`mid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `faccount` varchar(30) NOT NULL,
  `msg` varchar(200) NOT NULL,
  `fmsg` varchar(200) NOT NULL,
  `subtime` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8 COMMENT='每一位注册用户拥有一张表';

--
-- 转存表中的数据 `wuhaoxiangfau`
--

INSERT INTO `wuhaoxiangfau` (`mid`, `uid`, `fid`, `fname`, `faccount`, `msg`, `fmsg`, `subtime`) VALUES
(21, 1, 2, 'rot', 'wecat_rot', '666', '', '2017-07-31 13:32:23'),
(29, 1, 2, 'rot', 'wecat_rot', '', 'hi', '2017-07-31 15:21:11'),
(70, 1, 3, 'rot2', 'wecat_rot2', '', '', '2017-08-01 08:00:00'),
(99, 1, 2, 'rot', 'wecat_rot', '', '哈咯', '2017-08-02 12:20:45'),
(100, 1, 2, 'rot', 'wecat_rot', '', '你好啊', '2017-08-02 14:13:20'),
(101, 1, 2, 'rot', 'wecat_rot', '', '这是一句超过6个字符的话', '2017-08-02 14:15:29'),
(102, 1, 2, 'rot', 'wecat_rot', '', '这句话5字', '2017-08-02 17:13:07'),
(103, 1, 2, 'rot', 'wecat_rot', '', '现在的时间是17:46', '2017-08-02 17:46:48'),
(104, 1, 2, 'rot', 'wecat_rot', '', '现在的时间是17:46', '2017-08-02 17:47:03'),
(105, 1, 2, 'rot', 'wecat_rot', '', '现在是17:57\n', '2017-08-02 17:57:16'),
(106, 1, 3, 'rot2', 'wecat_rot2', '', '你好，这是我们第一句话', '2017-08-02 18:20:41'),
(107, 1, 2, 'rot', 'wecat_rot', '', '这是我发的一条信息', '2017-08-02 19:32:44'),
(108, 1, 2, 'rot', 'wecat_rot', '我是rot，我现在给你发了一条数据', '', '2017-08-02 19:44:26'),
(109, 1, 2, 'rot', 'wecat_rot', '这是我给你发的第二条数据', '', '2017-08-02 19:53:38'),
(110, 1, 2, 'rot', 'wecat_rot', '你是傻逼吗', '', '2017-08-02 20:20:54'),
(111, 1, 2, 'rot', 'wecat_rot', '', '你好', '2017-08-04 10:29:12'),
(112, 1, 2, 'rot', 'wecat_rot', '', 'halo', '2017-08-04 10:30:51'),
(113, 1, 2, 'rot', 'wecat_rot', '', '666', '2017-08-04 10:32:46'),
(114, 1, 2, 'rot', 'wecat_rot', '', '666', '2017-08-04 10:33:36'),
(115, 1, 2, 'rot', 'wecat_rot', '', '你好', '2017-08-04 10:39:00'),
(116, 1, 2, 'rot', 'wecat_rot', '', '哈哈哈', '2017-08-04 10:42:50'),
(117, 1, 2, 'rot', 'wecat_rot', '哈什么', '', '2017-08-04 10:45:26'),
(118, 1, 2, 'rot', '', '', '不知道的', '2017-08-04 11:14:20'),
(119, 1, 2, 'rot', '', '', '哈哈', '2017-08-04 11:14:57'),
(120, 1, 2, 'rot', 'wecat_rot', '哈什么', '', '2017-08-04 11:33:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`uid`), ADD UNIQUE KEY `uname` (`uname`);

--
-- Indexes for table `wecat_rot`
--
ALTER TABLE `wecat_rot`
 ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `wecat_rot2`
--
ALTER TABLE `wecat_rot2`
 ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `wuhaoxiangfau`
--
ALTER TABLE `wuhaoxiangfau`
 ADD PRIMARY KEY (`mid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `wecat_rot`
--
ALTER TABLE `wecat_rot`
MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=103;
--
-- AUTO_INCREMENT for table `wecat_rot2`
--
ALTER TABLE `wecat_rot2`
MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `wuhaoxiangfau`
--
ALTER TABLE `wuhaoxiangfau`
MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=121;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
