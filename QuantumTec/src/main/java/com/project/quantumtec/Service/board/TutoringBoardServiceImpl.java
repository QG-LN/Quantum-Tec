package com.project.quantumtec.Service.board;

import com.project.quantumtec.DAO.board.TutoringBoardDAO;
import com.project.quantumtec.DTO.Board.TutoringWriteDTO;
import com.project.quantumtec.DTO.Request.board.*;
import com.project.quantumtec.DTO.Response.board.TutoringEnrollResponseDTO;
import com.project.quantumtec.DTO.Response.board.TutoringListResponseDTO;
import com.project.quantumtec.DTO.Response.board.TutoringOrderDataListResponseDTO;
import com.project.quantumtec.Service.utils.EmailService;
import com.project.quantumtec.VO.board.TutoringEnrollVO;
import com.project.quantumtec.VO.board.TutoringPostVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.ArrayList;
import java.util.List;

@Service
public class TutoringBoardServiceImpl implements TutoringBoardService{

    @Autowired
    private TutoringBoardDAO tutoringBoardDAO;

    @Autowired
    private EmailService emailService;

    @Autowired
    private TemplateEngine templateEngine;  // 이메일 템플릿 엔진

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
        List<TutoringPostVO> tutoringPostVO = tutoringBoardDAO.getTutoringList(request);

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
        TutoringPostVO vo = tutoringBoardDAO.getTutoringOrderDataList();

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

        return tutoringBoardDAO.writeTutoring(dto);
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

        return tutoringBoardDAO.modifyTutoring(dto);
    }

    @Override
    public boolean deleteTutoring(TutoringDeleteDTO request) {
        return tutoringBoardDAO.deleteTutoring(request);
    }

    @Override
    public boolean updateTutoringEnroll(TutoringEnrollRequestDTO request) {
        System.out.println(request.getEnrollState());

        String check = tutoringBoardDAO.checkTutoringEnroll(request);
        System.out.println(check);

        // 신청 여부값이 null -> 신청 기록 없음
        if(check == null){
            return tutoringBoardDAO.insertTutoringEnroll(request);
        }else{
            // 신청 여부 결과 값이 신청 또는 취소 => 신청자가 신청을 취소 또는 신청
            if(check.equals("신청") || check.equals("취소")){
                return true;
            }

            // 신청 여부 결과 값이 거절 또는 수락이 아닌 경우 => 튜터가 신청을 수락 또는 거절
            Context context = new Context();
            context.setVariable("tutoringLink", request.getTutoringLink());    // 템플릿에 전달할 변수 설정

            String title = "튜터링 신청 ";

            if(request.getEnrollState().equals("수락")){
                context.setVariable("accepted", true);
                title += "수락";
            }else {
                context.setVariable("accepted", false);
                title += "거절";
            }
            String htmlContent = templateEngine.process("html/emailTemplate/TutoringEnrollAccept.html", context);

            try{
                // 이메일로 알림 보내기 [카카오톡 링크와 함께]
                emailService.sendEmail(request.getUserEmail(), title, htmlContent);

            } catch (Exception e) {
                throw new RuntimeException(e);
            }

        }

        return tutoringBoardDAO.updateTutoringEnroll(request);
    }

    @Override
    public List<TutoringEnrollResponseDTO> getTutoringEnrollList(TutoringEnrollRequestDTO request) {
        List<TutoringEnrollResponseDTO> dtos = new ArrayList<>();
        List<TutoringEnrollVO> vos = tutoringBoardDAO.getTutoringEnrollList(request);

        // VO -> DTO
        for(int i = 0; i< vos.size(); i++){
            TutoringEnrollResponseDTO dto = new TutoringEnrollResponseDTO();
            dto.setEnrollCreatedAt(vos.get(i).getEnrollCreatedAt());
            dto.setEnrollUpdatedAt(vos.get(i).getEnrollUpdatedAt());
            dto.setEnrollState(vos.get(i).getEnrollState());
            dto.setUserNickname(vos.get(i).getUserNickname());
            dto.setUserEmail(vos.get(i).getUserEmail());
            dtos.add(dto);
        }

        return dtos;
    }

    // 튜터링 게시물 신청 상태를 반환
    @Override
    public String checkTutoringEnroll(TutoringEnrollRequestDTO request){
        String result = tutoringBoardDAO.checkTutoringEnroll(request);

        if(result == null){
            return "없음";
        }
        return result;
    }

    /**
     * 튜터링 게시물 활성화 상태 변경 후 결과 반환
     */
    @Override
    public boolean updateTutoringPostStatus(TutoringPostStatusUpdateDTO request) {
        return tutoringBoardDAO.updateTutoringPostStatus(request);
    }
}
