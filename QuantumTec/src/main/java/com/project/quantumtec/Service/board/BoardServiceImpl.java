package com.project.quantumtec.Service.board;

import com.project.quantumtec.DAO.board.BoardDAO;
import com.project.quantumtec.DTO.Board.TutoringWriteDTO;
import com.project.quantumtec.DTO.Request.board.*;
import com.project.quantumtec.DTO.Response.board.*;
import com.project.quantumtec.VO.board.TutoringEnrollVO;
import com.project.quantumtec.VO.board.TutoringPostVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("BoardServiceImpl")
public class BoardServiceImpl implements BoardService{

    @Autowired
    private BoardDAO boardDAO;

    @Override
    public List<ListResponseDTO> getPostSearchList(ListDTO request) {
        int itemNum = 10; // 한 페이지 당 게시글 수
        request.setStartIndex((request.getPageNum()-1)*itemNum); // 페이지에 따른 시작 게시글 인덱스 계산
        request.setEndIndex(itemNum); // 한 페이지 당 게시글 수
        return boardDAO.getPostSearchList(request);
    }

    @Override
    public int getPostListCount(ListDTO request) {
        System.out.println(boardDAO.getPostCount(request));
        return boardDAO.getPostCount(request);
    }

    @Override
    public ViewResponseDTO getPost(ViewDTO request) {
        return boardDAO.getPost(request);
    }

    @Override
    public boolean viewCountUp(ViewDTO request) {
        return boardDAO.viewCountUp(request);
    }

    @Override
    public boolean writePost(WriteDTO request) {
        return boardDAO.writePost(request);
    }

    @Override
    public boolean modifyPost(ModifyDTO request) {
        return boardDAO.modifyPost(request);
    }

    @Override
    public boolean deletePost(DeleteDTO request) {
        return boardDAO.deletePost(request);
    }

    @Override
    public boolean upvotePost(VoteDTO request) {
        return boardDAO.upvotePost(request);
    }

    @Override
    public boolean downvotePost(VoteDTO request) {
        return boardDAO.downvotePost(request);
    }

    // 다음 게시글 인덱스를 가져오고, 존재할 경우 해당 게시글 조회
    @Override
    public int getNextPost(NavigateViewDTO request) {
        int nextPostIndex = boardDAO.getNextPost(request); // 다음 게시글 인덱스 가져오기
        if (nextPostIndex > 0){ // 다음 게시글 존재하면
            return nextPostIndex;
        }
        else {
            return 0;
        }
    }

    // 이전 게시글 인덱스를 가져오고, 존재할 경우 해당 게시글 조회
    @Override
    public int getPrevPost(NavigateViewDTO request) {
        int prevPostIndex = boardDAO.getPrevPost(request); // 이전 게시글 인덱스 가져오기
        if (prevPostIndex > 0){ // 이전 게시글 존재하면
            return prevPostIndex;
        }
        else {
            return 0;
        }
    }

    @Override
    public List<CommentListResponseDTO> getCommentList(com.project.quantumtec.DTO.Request.board.CommentListDTO request) {
        int itemNum = 10; // 한 페이지(로딩 단위) 당 표시할 댓글 수
        request.setStartIndex((request.getPageNum()-1)*itemNum); // 페이지 (로딩 단위)에 따른 시작 댓글 인덱스 계산
        request.setEndIndex(itemNum); // 한 페이지(로딩 단위) 당 댓글 수
        return boardDAO.getCommentList(request);
    }

    @Override
    public int getCommentCount(CommentCountDTO request) {
        return boardDAO.getCommentCount(request);
    }

    @Override
    public boolean writeComment(CommentWriteDTO request) {
        return boardDAO.writeComment(request);
    }

    @Override
    public boolean modifyComment(CommentModifyDTO request) {
        return boardDAO.modifyComment(request);
    }

    @Override
    public boolean deleteComment(CommentDeleteDTO request) { return boardDAO.deleteComment(request); }

    @Override
    public boolean upvoteComment(CommentVoteDTO request) {
        return boardDAO.upvoteComment(request);
    }

    @Override
    public boolean downvoteComment(CommentVoteDTO request) {
        return boardDAO.downvoteComment(request);
    }

    @Override
    public List<TutoringListResponseDTO> getTutoringList(TutoringListDTO request) {
        List<TutoringListResponseDTO> tutoringListResponseList = new ArrayList<>();
        String separator = "\\[000\\]";

        // 과목을 배열로
        String[] subject = request.getSubject();
        request.setSubject(subject);

        // 키워드가 비었으면 ""로, 있으면 키워드로
        String keyword = request.getKeyword();
        if(keyword.isEmpty())
            request.setKeyword("");
        else
            request.setKeyword(keyword);

        // 튜터링 데이터 리스트
        List<TutoringPostVO> tutoringPostVO = boardDAO.getTutoringList(request);

        for(int i = 0; i < tutoringPostVO.size(); i++) {
            // DTO 객체 생성
            TutoringListResponseDTO dto = new TutoringListResponseDTO();

            // VO 객체를 DTO 객체로 변환 [기본 값만]
            dto = dto.mapTutoringPostVOToDTO(tutoringPostVO.get(i));

            // 정보 데이터에서 필요한 데이터만 추출
            /**
             * CONTENT 내부 데이터 구조
             * postIntro        - 게시글 소개
             * postContent      - 게시글 내용
             * runningType      - 진행 방식
             * link             - 링크
             * expectedTime     - 예상 소요 시간
             * startDate        - 시작 날짜
             * */
            String[] data = tutoringPostVO.get(i).getPostTutoringContent().split(separator);
            dto.setPostIntro(data[0].split("\\[-\\]")[1]);                    // 게시글 소개
            dto.setPostContent(data[1].split("\\[-\\]")[1]);                  // 게시글 내용
            dto.setRunningType(data[2].split("\\[-\\]")[1].equals("1"));      // 진행 방식
            dto.setLink(data[3].split("\\[-\\]")[1]);                         // 링크
            dto.setExpectedTime(data[4].split("\\[-\\]")[1]);                 // 예상 소요 시간
            dto.setStartDate(data[5].split("\\[-\\]")[1]);                    // 시작 날짜

            tutoringListResponseList.add(dto);

        }
        return tutoringListResponseList;
    }

    @Override
    public TutoringOrderDataListResponseDTO getTutoringOrderDataList() {
        TutoringPostVO vo = boardDAO.getTutoringOrderDataList();

        TutoringOrderDataListResponseDTO dto = new TutoringOrderDataListResponseDTO();
        dto.setCategory(vo.getGameCategories());
        dto.setTags(vo.getTags());
        return dto;
    }

    @Override
    public boolean writeTutoring(TutoringWriteRequestDTO request) throws Exception {
        TutoringWriteDTO dto = new TutoringWriteDTO();
        String separator = "[000]";
        dto.setPostTutoringTitle(request.getPostTitle());           //  게시글 제목
        dto.setUserID(request.getUserID());                         // 유저 아이디

        dto.setPostTutoringUserCount(0);                            // 현재 모집 인원
        dto.setPostTutoringMaxUserCount(request.getMaxUserCount()); // 최대 모집 인원
        // content에 들어갈 데이터를 세팅
        String content = "postIntro[-]" + request.getPostIntro() + separator +
                "postContent[-]" + request.getPostContent() + separator +
                "runningType[-]" + (request.isRunningType() ? "1" : "0") + separator +
                "link[-]" + request.getLink() + separator +
                "expectedTime[-]" + request.getExpectedTime() + separator +
                "startDate[-]" + request.getStartDate();
        dto.setPostTutoringContent(content);                        // 게시글 내용

        dto.setPostTutoringCategory(request.getCategory().split(",")); // 게시글 카테고리
        dto.setPostTutoringTags(request.getTag().split(","));         // 게시글 태그

        return boardDAO.writeTutoring(dto);
    }

    @Override
    public boolean modifyTutoring(TutoringModifyDTO request) {
        TutoringWriteDTO dto = new TutoringWriteDTO();
        String separator = "[000]";
        dto.setPostTutoringTitle(request.getPostTitle());           //  게시글 제목
        dto.setUserID(request.getUserID());                         // 유저 아이디

        dto.setPostTutoringUserCount(0);                            // 현재 모집 인원
        dto.setPostTutoringMaxUserCount(request.getMaxUserCount()); // 최대 모집 인원
        // content에 들어갈 데이터를 세팅
        String content = "postIntro[-]" + request.getPostIntro() + separator +
                "postContent[-]" + request.getPostContent() + separator +
                "runningType[-]" + (request.isRunningType() ? "1" : "0") + separator +
                "link[-]" + request.getLink() + separator +
                "expectedTime[-]" + request.getExpectedTime() + separator +
                "startDate[-]" + request.getStartDate();
        dto.setPostTutoringContent(content);                        // 게시글 내용

        dto.setPostTutoringCategory(request.getCategory().split(",")); // 게시글 카테고리
        dto.setPostTutoringTags(request.getTag().split(","));         // 게시글 태그

        dto.setPostTutoringIndex(request.getPostIndex());

        return boardDAO.modifyTutoring(dto);
    }

    @Override
    public boolean deleteTutoring(TutoringDeleteDTO request) {
        return boardDAO.deleteTutoring(request);
    }

    @Override
    public boolean insertTutoringEnroll(TutoringEnrollRequestDTO request) {
        return boardDAO.insertTutoringEnroll(request);
    }

    @Override
    public boolean updateTutoringEnroll(TutoringEnrollRequestDTO request) {
        return boardDAO.updateTutoringEnroll(request);
    }

    @Override
    public List<TutoringEnrollResponseDTO> getTutoringEnrollList(TutoringEnrollRequestDTO request) {
        List<TutoringEnrollResponseDTO> dtos = new ArrayList<>();
        List<TutoringEnrollVO> vos = boardDAO.getTutoringEnrollList(request);

        // VO -> DTO
        for(int i = 0; i< vos.size(); i++){
            TutoringEnrollResponseDTO dto = new TutoringEnrollResponseDTO();
            dto.setEnrollCreatedAt(vos.get(i).getEnrollCreatedAt());
            dto.setEnrollUpdatedAt(vos.get(i).getEnrollUpdatedAt());
            dto.setEnrollState(vos.get(i).getEnrollState());
            dto.setUserNickname(vos.get(i).getUserNickname());
            dtos.add(dto);
        }

        return dtos;
    }

}
