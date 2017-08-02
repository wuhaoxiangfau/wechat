-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-07-31 18:18:45
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wechat`
--

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `uname` varchar(20) NOT NULL,
  `account` varchar(30) NOT NULL,
  `upwd` varchar(20) NOT NULL,
  `upic` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`uid`, `uname`, `account`, `upwd`, `upic`) VALUES
(1, '邬昊翔', 'wuhaoxiangfau', '123456', 'img/urs_pic.png'),
(2, 'rot', 'wecat_rot', '123456', 'img/user_01.jpg'),
(3, 'rot2', 'wecat_rot2', '123456', 'img/urs_pic.png'),
(4, 'rot3', 'wechat_rot3', '123456', 'img/user_01.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `wecat_rot`
--

CREATE TABLE `wecat_rot` (
  `mid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `faccount` varchar(30) NOT NULL,
  `msg` varchar(200) NOT NULL,
  `fmsg` varchar(200) NOT NULL,
  `subtime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `wecat_rot`
--

INSERT INTO `wecat_rot` (`mid`, `uid`, `fid`, `fname`, `faccount`, `msg`, `fmsg`, `subtime`) VALUES
(27, 2, 1, '邬昊翔', 'wuhaoxiangfau', '', 'hi', '2017-08-01 00:08:27'),
(28, 2, 1, '邬昊翔', 'wuhaoxiangfau', '熬了4天夜终于做出来了', '', '2017-08-01 00:10:56'),
(29, 2, 1, '邬昊翔', 'wuhaoxiangfau', '', '666', '2017-08-01 00:11:02'),
(30, 2, 1, '邬昊翔', 'wuhaoxiangfau', '现在还是一个毛胚版', '', '2017-08-01 00:11:35'),
(31, 2, 1, '邬昊翔', 'wuhaoxiangfau', '', '666', '2017-08-01 00:12:56'),
(33, 2, 1, '邬昊翔', 'wuhaoxiangfau', '还有注册，新消息提醒等未做', '', '2017-08-01 00:16:54');

-- --------------------------------------------------------

--
-- 表的结构 `wuhaoxiangfau`
--

CREATE TABLE `wuhaoxiangfau` (
  `mid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `faccount` varchar(30) NOT NULL,
  `msg` varchar(200) NOT NULL,
  `fmsg` varchar(200) NOT NULL,
  `subtime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='每一位注册用户拥有一张表';

--
-- 转存表中的数据 `wuhaoxiangfau`
--

INSERT INTO `wuhaoxiangfau` (`mid`, `uid`, `fid`, `fname`, `faccount`, `msg`, `fmsg`, `subtime`) VALUES
(32, 1, 2, 'rot', 'wecat_rot', 'hi', '', '2017-08-01 00:08:27'),
(33, 1, 2, 'rot', 'wecat_rot', '', '熬了4天夜终于做出来了', '2017-08-01 00:10:56'),
(34, 1, 2, 'rot', 'wecat_rot', '666', '', '2017-08-01 00:11:02'),
(35, 1, 2, 'rot', 'wecat_rot', '', '现在还是一个毛胚版', '2017-08-01 00:11:35'),
(36, 1, 2, 'rot', 'wecat_rot', '666', '', '2017-08-01 00:12:56'),
(38, 1, 2, 'rot', 'wecat_rot', '', '还有注册，新消息提醒等未做', '2017-08-01 00:16:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uname` (`uname`);

--
-- Indexes for table `wecat_rot`
--
ALTER TABLE `wecat_rot`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `wuhaoxiangfau`
--
ALTER TABLE `wuhaoxiangfau`
  ADD PRIMARY KEY (`mid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `wecat_rot`
--
ALTER TABLE `wecat_rot`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- 使用表AUTO_INCREMENT `wuhaoxiangfau`
--
ALTER TABLE `wuhaoxiangfau`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
